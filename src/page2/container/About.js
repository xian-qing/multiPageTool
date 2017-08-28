/**
 * Created by stone on 2017/6/20.
 */
/**
 * Created by stone on 2017/6/19.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { removeTodoIdx} from '../action/index'
 class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    remove(){
        console.log(2)
        this.props.dispatch(removeTodoIdx(0))
    }
    render(){
        let match  = this.props.match
        return (
            <div className="Home">
                我是About
                <span onClick={e=>{
                    this.remove()
                }}>子组件删除第一个</span>
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>
                            使用 React 渲染
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>
                            组件
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>
                            属性 v. 状态
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

function getlist(state){
    return {list:state.todo}
}

export default connect(getlist)(Pay)