import React from 'react';
import { connect } from 'react-redux'
import { removeTodoIdx} from '../action/index'
class ccc extends React.Component {
    remove(){
        console.log(2)
        this.props.dispatch(removeTodoIdx(0))
    }
    render(){
        console.log(this.props)
        return (
            <div className="" >
                <span onClick={e=>{
                    this.remove()
                }}>子组件删除第一个</span>
            </div>
        )
    }
}

function getlist(state){
    return {list:state.todo}
}

export default connect(getlist)(ccc)