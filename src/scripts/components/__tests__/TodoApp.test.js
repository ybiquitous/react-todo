import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'tape'

import TodoInput from '../TodoInput'
import TodoList from '../TodoList'
import TodoApp from '../TodoApp'

const props = () => ({
  storage: { load: sinon.spy(), save: sinon.spy() },
})

test('render', (t) => {
  const wrapper = shallow(<TodoApp {...props()} />)
  t.equal(wrapper.find(TodoInput).length, 1)
  t.equal(wrapper.find(TodoList).length, 1)
  t.end()
})

test('add new todo', (t) => {
  const wrapper = shallow(<TodoApp {...props()} />)
  wrapper.find(TodoInput).simulate('commit', { value: 'aaa' })
  t.deepEqual(wrapper.state('todos'), [{ id: 1, text: 'aaa', done: false }])
  t.end()
})

test('todo done', (t) => {
  const wrapper = shallow(<TodoApp {...props()} />)
  wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
  wrapper.find(TodoList).simulate('done', { id: 1, done: true })
  t.deepEqual(wrapper.state('todos'), [{ id: 1, text: 'aaa', done: true }])
  t.end()
})

test('delete todo', (t) => {
  const wrapper = shallow(<TodoApp {...props()} />)
  wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
  wrapper.find(TodoList).simulate('delete', { id: 1 })
  t.equal(wrapper.state('todos').length, 0)
  t.end()
})
