import React from 'react'

export default class TodoInput extends React.Component {
  static get propTypes() {
    return {
      onCommit: React.PropTypes.func.isRequired
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
    return <input type="text" onKeyPress={this.handleKeyPress} />
  }
}
