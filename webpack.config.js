/**
 * Created by wxq on 2017/8/24.
 */
//引入工具模块
const path = require('path');
const glob = require('glob');
let fs = require('fs')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

//获取当前开发文件名
const agr = JSON.parse(process.env.npm_config_argv).original;
const devDirName = agr[2];
console.log("当前运行环境：", isPro ? 'production' : 'development',devDirName?'\n当前开发文件项目为'+devDirName:'');

// 引入dev-server配置文件
const serverConfig = require('./config/config.server.js');

//获取多项目入口文件
const files = glob.sync(path.resolve()+'/src/*/index.js');
//console.log(files);



let entryFn = () =>{
    let entry = {};
    files.map((src)=>{
        let pageName = /.*\/(src\/.*?\/index)\.js/.exec(src)[1].split('/')[1];
        if(isPro){
            entry[pageName] = [src]
        }else {
            if(pageName == devDirName){
                //entry[pageName] = [ "webpack-dev-server/client?http://127.0.0.1:8080", "webpack/hot/only-dev-server",src]
                entry[pageName] = [ "react-hot-loader/patch","webpack-dev-server/client?http://127.0.0.1:8080",src]
                //entry[pageName] = [src]
            }
        }

    });
    return entry
};


let pluginsFn = ()=>{
    let plugins = [];
    let entryObj = entryFn()
    for(let e in entryObj){
        let pageName = e;
        let html = new HtmlWebpackPlugin({
            filename: `${pageName}.html`,
            template: path.join(path.resolve(),`/src/${pageName}/index.html`),
            chunks: ['vendor',pageName], //需要引入的chunk，不配置就会引入所有页面的资源
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            //hash: true, // 为静态资源生成hash值
            showErrors: false,  //错误信息不写入
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        });
        plugins.push(html)
    }
    if(isPro){

    }else {
        plugins.push(
            //new webpack.NoErrorsPlugin(), //允许错误不打断程序
            new webpack.HotModuleReplacementPlugin() //增加：webpack热替换插件
        )
    }
    plugins.push(
        new ExtractTextPlugin({
        filename: './css/[name]/index.[contenthash].css',
        // allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
    if(fs.existsSync('MP_verify_FctEvRoUak8HPaVF.txt')){
        plugins.push(new CopyWebpackPlugin([{from:  __dirname + '/MP_verify_FctEvRoUak8HPaVF.txt', to:  __dirname + '/dist/MP_verify_FctEvRoUak8HPaVF.txt'}]))
    }
    return plugins
}

module.exports = {
    context: path.resolve(__dirname, './src'),
    // 配置服务器
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: serverConfig.port,
        host: serverConfig.host,
        proxy: serverConfig.proxy,
        inline: true,
        hot: true,
    },
    devtool:isPro?'':'eval',
    entry:entryFn(),
    output: {
        path:path.resolve(__dirname, "dist"), // string
        filename: isPro?"./js/[name]/index.[chunkhash].js":"./js/[name]/index.js", // 用于多个入口点(entry point)（出口点？）
        //filename: "[chunkhash].js", // 用于长效缓存
    },
    //publicPath: "/assets/", // string
    plugins: pluginsFn(),
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,
                include: path.join(path.resolve(),'src'),
                use: [
                    {
                        loader: 'babel-loader',//loader的名称（必须）

                    }

                ],
            },
            {
                test: /\.(css|scss|less)$/,
                include: path.join(path.resolve(),'src'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isPro,
                                sourceMap: true,
                                modules: false,
                                importLoaders: 2,
                                //localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [require('autoprefixer')()],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                use: [
                    {
                        //加载url-loader 同时安装 file-loader;
                        loader : 'url-loader',
                        options : {
                            //小于10000K的图片文件转base64到css里,当然css文件体积更大/这里做法是都使用路径;
                            limit : 1,
                            //设置最终img路径;
                            name : './image/[name]-[hash].[ext]',
                            //name : '[path][name].[ext]'
                        }
                    },
                    {
                        //压缩图片(另一个压缩图片：image-webpack-loader);
                        loader : 'img-loader',
                        options:{
                            minimize:true,
                            optimizationLevel:5,
                            progressive:true
                        }
                    },

                ]
            }
        ]
    }
}