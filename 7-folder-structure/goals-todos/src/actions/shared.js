import API from 'goals-todos-api'

// ACTION TYPE
export const RECEIVE_DATA = 'RECEIVE_DATA'

// ACTION CREATOR
const receiveData = (todos, goals) => ({
  type: RECEIVE_DATA,
  todos,
  goals
})

export const handleInitialData = () => {
  return dispatch => {
    return Promise.all([API.fetchTodos(), API.fetchGoals()]).then(
      ([todos, goals]) => {
        dispatch(receiveData(todos, goals))
      }
    )
  }
}