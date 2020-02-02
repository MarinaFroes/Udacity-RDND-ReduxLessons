import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  handleDeleteTodo,
  handleToggle,
  handleAddTodo
} from '../actions/todos'
import List from './List'

class Todos extends Component {
  addItem = e => {
    e.preventDefault()
    this.props.dispatch(
      handleAddTodo(this.input.value, () => (this.input.value = ""))
    )
  }

  removeItem = todo => {
    this.props.dispatch(handleDeleteTodo(todo))
  }

  toggleItem = id => {
    this.props.dispatch(handleToggle(id))
  }

  render() {
    return (
      <div style={{ border: "2px solid red", width: "50%" }}>
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder="call mom"
          ref={input => (this.input = input)}
        />
        <button onClick={this.addItem}>Add todo</button>
        <List
          toggle={this.toggleItem}
          items={this.props.todos}
          remove={this.removeItem}
        />
      </div>
    )
  }
}

export default connect(state => ({
  todos: state.todos
}))(Todos)