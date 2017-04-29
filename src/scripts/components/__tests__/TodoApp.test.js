import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'ava'

import TodoInput from '../TodoInput'
import TodoList from '../TodoList'
import TodoApp from '../TodoApp'

let sandbox
let props

test.beforeEach(() => {
  sandbox = sinon.sandbox.create()
  props = {
    storage: { load: sinon.spy(), save: sinon.spy() },
  }
})

test.afterEach(() => {
  sandbox.restore()
})

test('render', (t) => {
  const wrapper = shallow(<TodoApp {...props} />)
  t.true(wrapper.find(TodoInput).length === 1)
  t.true(wrapper.find(TodoList).length === 1)
})

test('add new todo', (t) => {
  const wrapper = shallow(<TodoApp {...props} />)
  wrapper.find(TodoInput).simulate('commit', { value: 'aaa' })
  t.deepEqual(wrapper.state('todos'), [{ id: 1, text: 'aaa', done: false }])
})

test('todo done', (t) => {
  const wrapper = shallow(<TodoApp {...props} />)
  wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
  wrapper.find(TodoList).simulate('done', { id: 1, done: true })
  t.deepEqual(wrapper.state('todos'), [{ id: 1, text: 'aaa', done: true }])
})

test('delete todo', (t) => {
  const wrapper = shallow(<TodoApp {...props} />)
  wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
  wrapper.find(TodoList).simulate('delete', { id: 1 })
  t.true(wrapper.state('todos').length === 0)
})
