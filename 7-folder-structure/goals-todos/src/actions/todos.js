import API from 'goals-todos-api'

// ACTION TYPES
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

// ACTION CREATORS
export const addTodo = todo => ({
  type: ADD_TODO,
  todo
})

const removeTodo = id => ({
  type: REMOVE_TODO,
  id
})

const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
})

export const handleDeleteTodo = todo => {
  return dispatch => {
    dispatch(removeTodo(todo.id))

    return API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodo(todo))
      alert("An error occurred. Try again.")
    })
  }
}

export const handleAddTodo = (name, cb) => {
  return dispatch => {
    API.saveTodo(name)
      .then(todo => {
        dispatch(addTodo(todo))
        cb()
      })
      .catch(() => {
        alert("There was an error. Try again.")
      })
  }
}

export const handleToggle = id => {
  return dispatch => {
    API.saveTodoToggle(id).catch(() => {
      dispatch(toggleTodo(id))
      alert("An error occurred. Try again.")
    })
  }
}
