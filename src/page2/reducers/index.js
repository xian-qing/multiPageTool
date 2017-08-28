import { combineReducers } from 'redux'
import todo  from './home.js'
const todoApp = combineReducers({
    todo:todo
})

export default todoApp