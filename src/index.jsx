import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './components/TodoApp'
import storage from './storage'

ReactDOM.render(<TodoApp storage={storage} />, document.querySelector('main'))
