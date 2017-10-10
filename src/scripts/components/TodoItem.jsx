// @flow
import React from 'react'
import styles from './TodoItem.css'

type Props = {
  id: number,
  text: string,
  done?: boolean,
  onDone?: ({ id: number, done: boolean }) => void,
  onDelete?: ({ id: number }) => void,
}

const defaultProps = {
  done: false,
  onDone: null,
  onDelete: null,
}

export default function TodoItem(props: Props) {
  const {
    id, text, done, onDone, onDelete,
  } = props

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
    /* eslint-disable jsx-a11y/label-has-for */
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
      <span
        className={styles.deleteButton}
        title="Delete (click or press ENTER)"
        onClick={handleDelete}
        onKeyPress={handleDelete}
        role="button"
        tabIndex="0"
      >
        <span role="img" aria-label="Delete">❌</span>
      </span>
    </li>
    /* eslint-enable jsx-a11y/label-has-for */
  )
}

TodoItem.defaultProps = defaultProps
