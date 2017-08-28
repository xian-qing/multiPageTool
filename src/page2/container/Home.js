/**
 * Created by stone on 2017/6/20.
 */
/**
 * Created by stone on 2017/6/19.
 */
import React from 'react';
export default class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:1
        }
    }
    componentDidMount() {

    }
    aaa = (e) =>{
        console.log(1)
        let a = e.target.value
        this.setState({value:a})
    }
    render(){
        return (
            <div className="Home">
                我是第一个路由home
                <input type="text" value={this.state.value} onChange={this.aaa}/>
            </div>
        )
    }
}

