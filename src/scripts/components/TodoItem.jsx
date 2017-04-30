import React from 'react'
import PropTypes from 'prop-types'
import styles from './TodoItem.css'

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
    if (onDone) { onDone({ id, done: event.target.checked }) }
  }

  function handleDelete({ key }) {
    if (!onDelete) { return }
    if (key && key !== 'Enter') { return }
    onDelete({ id })
  }

  const domID = `todo-item-${id}`
  return (
    <li className={styles.item}>
      <input
        id={domID}
        type="checkbox"
        title="Done"
        checked={done}
        onChange={handleChange}
        className={styles.checkbox}
      />
      <label
        htmlFor={domID}
        className={`${styles.label} ${done ? styles.done : ''}`}
        title={text}
      >
        {text}
      </label>
      { /* eslint-disable jsx-a11y/no-static-element-interactions */ }
      <span
        className={styles.deleteButton}
        title="Delete (click or press ENTER)"
        onClick={handleDelete}
        onKeyPress={handleDelete}
        role="button"
        tabIndex="0"
      >
        ❌
      </span>
      { /* eslint-enable jsx-a11y/no-static-element-interactions */ }
    </li>
  )
}

TodoItem.propTypes = propTypes
TodoItem.defaultProps = defaultProps
