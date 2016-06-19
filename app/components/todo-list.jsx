import React from 'react'

export default function TodoList(props) {
  const list = props.todos.map(todo => <li key={todo.id}>{todo.text}</li>)
  return (
    <ul>
      {list}
    </ul>
  )
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired
}
