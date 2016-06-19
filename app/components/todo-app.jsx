import React from 'react'
import TodoInput from './todo-input.jsx'
import TodoList from './todo-list.jsx'

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props)

    this.handleCommit = this.handleCommit.bind(this)

    this.state = {
      todos: [
        { id: 1, text: 'a' },
        { id: 2, text: 'b' }
      ]
    }
  }

  handleCommit(newText) {
    const todos = this.state.todos
    let maxId = 0
    if (todos.length > 0) {
      maxId = Math.max(...todos.map(todo => todo.id))
    }
    const newTodo = { id: maxId + 1, text: newText }
    this.setState({ todos: todos.concat(newTodo) })
  }

  render() {
    return (
      <div>
        <TodoInput onCommit={this.handleCommit} />
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}
