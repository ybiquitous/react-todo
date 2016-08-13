import React, { PropTypes } from 'react'

export default function TodoItem({ id, text, done, onDone, onDelete }) {
  function handleChange(event) {
    onDone({ id, done: event.target.checked })
  }

  function handleClick(event) {
    event.preventDefault()
    onDelete({ id })
  }

  const domID = `todo-item-${id}`
  const style = { marginLeft: '0.5rem' }
  if (done) {
    style.textDecoration = 'line-through'
    style.color = 'gray'
  }
  return (
    <li key={id} style={{ lineHeight: '1.5rem' }}>
      <input
        id={domID}
        type="checkbox"
        title="Done"
        checked={done}
        onChange={handleChange}
      />
      <label htmlFor={domID} style={style}>{text}</label>
      <a href="" title="Delete" style={{ marginLeft: '5rem' }} onClick={handleClick}>x</a>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  done: PropTypes.bool,
  onDone: PropTypes.func,
  onDelete: PropTypes.func
}
