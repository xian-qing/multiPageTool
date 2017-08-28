import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo,removeTodo} from '../action/index'
import {
    BrowserRouter as Router,
        Route,
        Link,
    Redirect
} from 'react-router-dom'
import { hashHistory } from 'react-router'
import Children from './children'
import Home from '../container/Home'
import About from '../container/About'
import Topics from '../container/Topics'
import img from '../image/qqq.png'
import '../css/home.scss'






class App extends Component {
    handleClick(e,type,t) {
        console.log(t)
        if(type){
            //添加
            window.idx = (window.idx||0)
            window.idx++
            this.props.dispatch(addTodo(idx))
        }else {
            //删除

            console.log(234)
            this.props.dispatch(removeTodo(t))
        }
    }
    render() {
        // Injected by connect() call:
        //const { dispatch, visibleTodos, visibilityFilter } = this.props
        //console.log(this.props)
        let list = []
        this.props.HomeList.map((v,i)=>{
            list.push(
                <div key={i} >
                    <span onClick={(e)=>{this.handleClick(e,0,v.text)}}>{v.text}</span>
                </div>
            )
        })
        return (
            <div>
                redux
                <div onClick={(e)=>{this.handleClick(e,1)}}>添加列表</div>
                <div onClick={(e)=>{this.handleClick(e,0)}}>删除列表</div>
                {list}
                <Children/>
                路由
                <img src={img} alt=""/>
                <Router basename="page2.html">
                    <div>
                        <ul>
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/about">关于</Link></li>
                            <li><Link to="/topics">主题列表1</Link></li>
                        </ul>

                        <hr/>
                       <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                       {/* <Redirect to="/myredux.html"/>*/}
                    </div>
                </Router>
            </div>

        )
    }
}

App.propTypes = {
    HomeList: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
}


// Which props do we want to inject, given the global state?
//props 注入全局 state
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        HomeList: state.todo,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)