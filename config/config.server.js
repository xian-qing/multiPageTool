/**
 * dev-server配置
 * Created by wxq on 2017/8/25.
 */
module.exports = {
    host: '127.0.0.1',
    port: 8080,
    proxy:{
        //'/':{
            //pathRewrite: 'http://127.0.0.1:8080/page2/index.html',
            //changeOrigin: true,
        //},
        '/api/': {
            target: 'http://www.jggvip.com',
            changeOrigin: true,
            secure: false
        },
        '/graphql': {
            target: 'http://api.jggvip.com',
            changeOrigin: true,
            secure: false
        }
    }
}