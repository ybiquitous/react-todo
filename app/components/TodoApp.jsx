import React from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [
        { id: 1, text: 'a', done: true },
        { id: 2, text: 'b', done: false }
      ]
    }

    this.handleCommit = this.handleCommit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleCommit(newText) {
    const todos = this.state.todos
    let maxId = 0
    if (todos.length > 0) {
      maxId = Math.max(...todos.map(todo => todo.id))
    }
    const newTodo = { id: maxId + 1, text: newText, done: false }
    this.setState({ todos: todos.concat(newTodo) })
  }

  handleCheck({ id, done }) {
    const found = this.state.todos.find(todo => todo.id === id)
    if (found) {
      found.done = done
      this.setState({ todos: this.state.todos })
    }
  }

  handleDelete({ id }) {
    const { todos } = this.state
    const deleted = todos.filter(todo => todo.id !== id)
    this.setState({ todos: deleted })
  }

  render() {
    return (
      <div>
        <TodoInput onCommit={this.handleCommit} />
        <TodoList todos={this.state.todos} onCheck={this.handleCheck} onDelete={this.handleDelete} />
      </div>
    )
  }
}
