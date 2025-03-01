import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../App.css'
import { handleInitialData } from '../actions/shared'
import Todos from './Todos'
import Goals from './Goals'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }

  render() {
    if (this.props.loading === true) {
      return <h3>Loading...</h3>
    }

    return (
      <div style={{ display: "flex" }}>
        <Todos />
        <Goals />
      </div>
    )
  }
}

export default connect(state => ({
  loading: state.loading
}))(App)
    