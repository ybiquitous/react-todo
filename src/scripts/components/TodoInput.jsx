import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onCommit: PropTypes.func.isRequired,
}

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { invalid: null }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const todo = event.target.elements.todo
    const value = todo.value.trim()
    if (value) {
      this.props.onCommit({ value })
      todo.value = ''
      this.setState({ invalid: null })
    }
  }

  handleInput(event) {
    const el = event.target
    const value = el.value.trim()
    this.setState({ invalid: !value })
  }

  render() {
    const { invalid } = this.state
    let inputClass
    if (invalid == null) {
      inputClass = null
    } else {
      inputClass = invalid ? 'invalid' : 'valid'
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="e.g. Reserve restaurant"
          autoFocus
          maxLength="300"
          onInput={this.handleInput}
          className={inputClass}
        />
        <p className={`alert${invalid ? ' show' : ''}`} role="alert">
          Please input some text.
        </p>
      </form>
    )
  }
}

TodoInput.propTypes = propTypes
