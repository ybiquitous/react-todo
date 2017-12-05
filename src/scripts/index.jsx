import React from 'react'
import { hydrate } from 'react-dom'
import TodoApp from './components/TodoApp'
import storage from './storage'

hydrate(<TodoApp storage={storage} />, document.querySelector('main'))
