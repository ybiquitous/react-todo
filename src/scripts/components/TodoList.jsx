import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import styles from './TodoList.css'

const propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func,
  onDelete: PropTypes.func,
}

const defaultProps = {
  onDone: null,
  onDelete: null,
}

export default function TodoList({ todos, onDone, onDelete }) {
  function renderItem(todo) {
    return <TodoItem {...todo} key={todo.id} onDone={onDone} onDelete={onDelete} />
  }
  return <ul className={styles.list}>{todos.map(renderItem)}</ul>
}

TodoList.propTypes = propTypes
TodoList.defaultProps = defaultProps
