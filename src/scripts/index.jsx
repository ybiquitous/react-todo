import React from 'react'
import { render } from 'react-dom'
import TodoApp from './components/TodoApp'
import storage from './storage'

render(<TodoApp storage={storage} />, document.querySelector('main'))
