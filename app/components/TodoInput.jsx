import React, { PropTypes } from 'react'

export default class TodoInput extends React.Component {
  static get propTypes() {
    return {
      onCommit: PropTypes.func.isRequired
    }
  }

  constructor(props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(event) {
    const el = event.target
    const value = el.value.trim()
    if (value && event.key === 'Enter') {
      this.props.onCommit(value)
      el.value = ''
    }
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Please type and press ENTER"
        autoFocus
        style={{ width: '100%', height: '2rem', padding: '0.1rem' }}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}
