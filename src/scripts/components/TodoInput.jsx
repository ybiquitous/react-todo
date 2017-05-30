import React from 'react'
import PropTypes from 'prop-types'
import styles from './TodoInput.css'

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

  inputStyle() {
    const { invalid } = this.state
    const classNames = [styles.input]
    if (invalid != null) {
      classNames.push(invalid ? styles.invalid : styles.valid)
    }
    return classNames.join(' ')
  }

  alertStyle() {
    const { invalid } = this.state
    const classNames = [styles.alert]
    if (invalid) { classNames.push(styles.alertShow) }
    return classNames.join(' ')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="e.g. Reserve restaurant"
          maxLength="300"
          onInput={this.handleInput}
          className={this.inputStyle()}
        />
        <p className={this.alertStyle()} role="alert">
          Please input some text.
        </p>
      </form>
    )
  }
}

TodoInput.propTypes = propTypes
