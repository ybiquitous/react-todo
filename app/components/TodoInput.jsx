import React, { PropTypes } from 'react'

export default function TodoInput({ onCommit }) {
  function handleKeyPress(event) {
    const el = event.target
    const value = el.value.trim()
    if (value && event.key === 'Enter') {
      onCommit(value)
      el.value = ''
    }
  }

  return (
    <input
      type="text"
      placeholder="Please type and press ENTER"
      autoFocus
      style={{ width: '100%', height: '2rem', padding: '0.1rem' }}
      onKeyPress={handleKeyPress}
    />
  )
}

TodoInput.propTypes = {
  onCommit: PropTypes.func.isRequired
}
