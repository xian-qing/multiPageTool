/**
 * Created by wxq on 2017/8/23.
 */
import {actionType } from '../action/index'

module.exports =  function todo(state = [], action) {
    switch (action.type) {
        case actionType.ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case actionType.REMOVE_TODO:
            state.forEach((v,i)=>{
                if(v.text == action.idx){
                    state.splice(i,1)
                }
            })
            return [...state]
        case actionType.REMOVE_TODO_IDX:
            state.forEach((v,i)=>{
                if(i == action.idx){
                    state.splice(i,1)
                }
            })
            return [...state]
        default:
            return state
    }
}