// Helper function

const generateId = () => {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
}

// Generic Library Code
const createStore = (reducer) => {
// The store should have four parts
// 1. The state
// 2. Get the state
// 3. Listen to changes on the state
// 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l!== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// ACTION TYPES AS VARIABLES
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// ACTION CREATORS
const addTodoAction = todo => ({
  type: ADD_TODO,
  todo
})

const removeTodoAction = id => ({
type: REMOVE_TODO,
id
})

const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
})

const addGoalAction = goal => ({
  type: ADD_GOAL,
  goal
})

const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
})

// Code specific to the app - the user would write it
// REDUCER FUNCTION - MUST BE PURE
const todos = (state = [], action) => {
  switch(action.type){
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter( todo => todo.id !== action.id)
    case TOGGLE_TODO:
    // Object.assign returns a new object with merged properties
    // It is still a pure function
      return state.map( todo => todo.id !== action.id ? todo :
      Object.assign({}, todo, {complete: !todo.complete}))
    default:
      return state
  }

  // SAME AS USING IF ELSE IF STATEMENT
  // if (action.type === 'ADD_TODO') {
  //   return state.concat([action.todo])
  // } else if( action.type === 'REMOVE_TODO'){
  //   return state.filter( todo => todo.id !== action.id)
  // } else if (action.type === 'TOGGLE_TODO'){
  //   return state.map( todo => todo.id !== action.id ? todo :
  //     Object.assign({}, todo, {complete: !todo.complete}))
  // } else {
  //   return state
  // }
}

const goals = (state = [], action) => {
  switch(action.type){
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

// ROOT REDUCER
const app = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app)

store.subscribe(() => {
  const { goals, todos } = store.getState()

  document.getElementById('goalsList').innerHTML = ''
  document.getElementById('todosList').innerHTML = ''

  goals.forEach(addGoalToDOM)
  todos.forEach(addTodoToDOM)
})


// Manipulate the DOM
const addTodo = () => {
  let input = document.getElementById('todo')
  const name = input.value
  input.value = ''

  store.dispatch(addTodoAction({
    name,
    complete: false,
    id: generateId()
  }))
}

const addGoal = () => {
  let input = document.getElementById('goal')
  const name = input.value
  input.value = ''

  store.dispatch(addGoalAction({
    name,
    id: generateId()
  }))
}

document.getElementById('todoBtn').addEventListener('click', addTodo)

document.getElementById('goalBtn').addEventListener('click', addGoal)

// Show text on the screen
const createRemoveButton = onClick => { 
  const removeBtn = document.createElement('button')
  removeBtn.innerHTML = 'X'
  removeBtn.addEventListener('click', onClick)
  return removeBtn
}

const addTodoToDOM = todo => {
  const node = document.createElement('li')
  const text = document.createTextNode(todo.name)

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeTodoAction(todo.id))
  })

  node.appendChild(text)
  node.appendChild(removeBtn)

  node.style.textDecoration = todo.complete ? 'line-through' : 'none'
  node.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(todo.id))
  })

  document.getElementById('todosList').appendChild(node)
}

const addGoalToDOM = goal => {
  const node = document.createElement('li')
  const text = document.createTextNode(goal.name)

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id))
  })

  node.appendChild(text)
  node.appendChild(removeBtn)

  document.getElementById('goalsList').appendChild(node)
}