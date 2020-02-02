import React, { Component } from 'react'
import { connect } from 'react-redux'

import { handleDeleteGoal, handleAddGoal } from '../actions/goals'
import List from './List'

class Goals extends Component {
  addItem = e => {
    e.preventDefault()

    this.props.dispatch(
      handleAddGoal(this.input.value, () => (this.input.value = ""))
    )
  }

  removeItem = goal => {
    this.props.dispatch(handleDeleteGoal(goal))
  }

  render() {
    return (
      <div style={{ border: "2px solid red", width: "50%" }}>
        <h1>Goals List</h1>
        <input
          type="text"
          placeholder="Become rich"
          ref={input => (this.input = input)}
        />
        <button onClick={this.addItem}>Add goal</button>
        <List items={this.props.goals} remove={this.removeItem} />
      </div>
    )
  }
}

export default connect(state => ({
  goals: state.goals
}))(Goals)
