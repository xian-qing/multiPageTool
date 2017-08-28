/*
 * action 类型
 */


export const actionType = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    REMOVE_TODO_IDX: 'REMOVE_TODO_IDX'
}


/*
 * 其它的常量
 */



/*
 * action 创建函数
 */

export function addTodo(text) {
    return { type: actionType.ADD_TODO, text }
}

export function removeTodo(idx) {
    return { type: actionType.REMOVE_TODO, idx}
}

export function removeTodoIdx(idx) {
    return { type: actionType.REMOVE_TODO_IDX, idx}
}