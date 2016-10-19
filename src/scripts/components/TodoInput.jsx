import React, { PropTypes, Component } from 'react'

const propTypes = {
  onCommit: PropTypes.func.isRequired,
}

export default class TodoInput extends Component {
  constructor(props) {
    super(props)

    this.state = { inputClass: null }

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
    }
  }

  handleInput(event) {
    const el = event.target
    const inputClass = el.checkValidity() ? 'valid' : 'invalid'
    this.setState({ inputClass })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="Reserve restaurant"
          autoFocus
          required
          maxLength="300"
          onInput={this.handleInput}
          className={this.state.inputClass}
        />
      </form>
    )
  }
}

TodoInput.propTypes = propTypes
