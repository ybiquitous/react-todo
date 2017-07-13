// @flow
import React from 'react'
import TodoItem from './TodoItem'
import styles from './TodoList.css'

type Props = {
  todos: Array<Object>,
  onDone: ({ id: number, done: boolean }) => void,
  onDelete: ({ id: number }) => void,
}

const defaultProps = {
  onDone: null,
  onDelete: null,
}

export default function TodoList({ todos, onDone, onDelete }: Props) {
  function renderItem(todo) {
    return <TodoItem {...todo} key={todo.id} onDone={onDone} onDelete={onDelete} />
  }
  return <ul className={styles.list}>{todos.map(renderItem)}</ul>
}

TodoList.defaultProps = defaultProps
