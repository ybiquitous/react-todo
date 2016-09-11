import React, { PropTypes } from 'react'
import TodoItem from './TodoItem'

const propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func,
  onDelete: PropTypes.func
}

export default function TodoList({ todos, onDone, onDelete }) {
  function renderItem(todo) {
    return <TodoItem {...todo} key={todo.id} onDone={onDone} onDelete={onDelete} />
  }
  return <ul>{todos.map(renderItem)}</ul>
}

TodoList.propTypes = propTypes
