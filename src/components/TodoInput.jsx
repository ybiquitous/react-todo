import React, { PropTypes } from 'react'

export default function TodoInput({ onCommit }) {
  function handleSubmit(event) {
    event.preventDefault()

    const todo = event.target.elements.todo
    const value = todo.value.trim()
    if (value) {
      onCommit({ value })
      todo.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="todo"
        placeholder="Please type and press ENTER"
        autoFocus
      />
    </form>
  )
}

TodoInput.propTypes = {
  onCommit: PropTypes.func
}
