// @flow
import React from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import styles from './TodoApp.css'

type Storage = {
  load: () => Object,
  save: (data: Object) => void,
}

export default class TodoApp extends React.Component {
  props: {
    storage: Storage,
  }

  state: {
    todos: Array<Object>,
  }

  state = this.props.storage.load() || { todos: [] }

  setState(data: Object) {
    super.setState(data)
    this.props.storage.save(data)
  }

  handleCommit = ({ value }: { value: string }) => {
    const { todos } = this.state
    const maxId = todos.length === 0 ? 0 : Math.max(...todos.map(t => t.id))
    const newTodo = { id: maxId + 1, text: value, done: false }
    this.setState({ todos: [newTodo].concat(todos) })
  }

  handleDone = ({ id, done }: { id: number, done: boolean }) => {
    const found = this.state.todos.find(todo => todo.id === id)
    if (found) {
      found.done = done
      this.setState({ todos: this.state.todos })
    }
  }

  handleDelete = ({ id }: { id: number }) => {
    const { todos } = this.state
    const deleted = todos.filter(todo => todo.id !== id)
    this.setState({ todos: deleted })
  }

  render() {
    const { todos } = this.state
    return (
      <div>
        <h1 className={styles.heading}>
          TODO List
          <span className={styles.count}>{todos.length}</span>
        </h1>
        <TodoInput onCommit={this.handleCommit} />
        <TodoList
          todos={todos}
          onDone={this.handleDone}
          onDelete={this.handleDelete}
        />
      </div>
    )
  }
}
