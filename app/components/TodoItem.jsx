import React, { PropTypes } from 'react'

export default function TodoItem({ id, text, done, onCheck, onDelete }) {
  function handleChange(event) {
    onCheck({ id, done: event.target.checked })
  }

  function handleClick(event) {
    event.preventDefault()
    onDelete({ id })
  }

  const domID = `input-${id}`
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
  done: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
