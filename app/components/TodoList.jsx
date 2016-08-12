import React, { PropTypes } from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onCheck, onDelete }) {
  const style = { listStyle: 'none', padding: 0 }
  return (
    <ul style={style}>
      {todos.map(t => <TodoItem key={t.id} onCheck={onCheck} onDelete={onDelete} {...t} />)}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}
