// @flow
import React from 'react'
import styles from './TodoInput.css'

export default class TodoInput extends React.Component {
  props: {
    onCommit: ({ value: string }) => void,
  }

  state: {
    invalid: ?boolean,
  }

  state = { invalid: null }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    // TODO: property `elements` is unsupported
    const { todo } = (event.target: any).elements
    const value = todo.value.trim()
    if (value) {
      this.props.onCommit({ value })
      todo.value = ''
      this.setState({ invalid: null })
    }
  }

  handleInput = ({ target }: SyntheticInputEvent) => {
    const value = target.value.trim()
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
