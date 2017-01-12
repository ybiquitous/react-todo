import React, { PropTypes } from 'react'
import tapOrClick from 'react-tap-or-click'

const propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  done: PropTypes.bool,
  onDone: PropTypes.func,
  onDelete: PropTypes.func,
}

const defaultProps = {
  done: false,
  onDone: null,
  onDelete: null,
}

export default function TodoItem({ id, text, done, onDone, onDelete }) {
  function handleChange(event) {
    if (onDone) onDone({ id, done: event.target.checked })
  }

  function handleDelete() {
    if (onDelete) onDelete({ id })
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
        title={text}
      >
        {text}
      </label>
      <span
        className="delete"
        title="Delete"
        {...tapOrClick(handleDelete)}
      >
        ❌
      </span>
    </li>
  )
}

TodoItem.propTypes = propTypes
TodoItem.defaultProps = defaultProps
