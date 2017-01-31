import React from 'react'
import { shallow } from 'enzyme'
import assert from 'assert'
import sinon from 'sinon'

import TodoInput from '../src/scripts/components/TodoInput'
import TodoList from '../src/scripts/components/TodoList'
import TodoApp from '../src/scripts/components/TodoApp'

describe('TodoApp', () => {
  let props
  before(() => {
    props = {
      storage: { load: sinon.spy(), save: sinon.spy() },
    }
  })

  it('render', () => {
    const wrapper = shallow(<TodoApp {...props} />)
    assert(wrapper.find(TodoInput).length === 1)
    assert(wrapper.find(TodoList).length === 1)
  })

  it('add new todo', () => {
    const wrapper = shallow(<TodoApp {...props} />)
    wrapper.find(TodoInput).simulate('commit', { value: 'aaa' })
    assert.deepStrictEqual(wrapper.state('todos'), [
      { id: 1, text: 'aaa', done: false },
    ])
  })

  it('todo done', () => {
    const wrapper = shallow(<TodoApp {...props} />)
    wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
    wrapper.find(TodoList).simulate('done', { id: 1, done: true })
    assert.deepStrictEqual(wrapper.state('todos'), [
      { id: 1, text: 'aaa', done: true },
    ])
  })

  it('delete todo', () => {
    const wrapper = shallow(<TodoApp {...props} />)
    wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
    wrapper.find(TodoList).simulate('delete', { id: 1 })
    assert(wrapper.state('todos').length === 0)
  })
})
