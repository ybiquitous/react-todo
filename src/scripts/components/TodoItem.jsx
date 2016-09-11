import React, { PropTypes } from 'react'

const propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  done: PropTypes.bool,
  onDone: PropTypes.func,
  onDelete: PropTypes.func
}

export default function TodoItem({ id, text, done, onDone, onDelete }) {
  function handleChange(event) {
    onDone({ id, done: event.target.checked })
  }

  function handleClick(event) {
    event.preventDefault()
    onDelete({ id })
  }

  const domID = `todo-item-${id}`
  return (
    <li>
      <input
        id={domID}
        type="checkbox"
        title="Done"
        checked={done}
        onChange={handleChange}
      />
      <label
        htmlFor={domID}
        className={done ? 'done' : null}
      >
        {text}
      </label>
      <a
        href=""
        title="Delete"
        onClick={handleClick}
      >
        X
      </a>
    </li>
  )
}

TodoItem.propTypes = propTypes
