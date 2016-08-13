import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TodoInput from '../src/components/TodoInput'
import TodoList from '../src/components/TodoList'
import TodoApp from '../src/components/TodoApp'

describe('TodoApp', () => {
  it('render', () => {
    const wrapper = shallow(<TodoApp />)
    expect(wrapper.find(TodoInput)).to.have.length(1)
    expect(wrapper.find(TodoList)).to.have.length(1)
  })

  it('add new todo', () => {
    const wrapper = shallow(<TodoApp />)
    wrapper.find(TodoInput).simulate('commit', { value: 'aaa' })
    expect(wrapper.state('todos')).to.deep.equal([
      { id: 1, text: 'aaa', done: false }
    ])
  })

  it('todo done', () => {
    const wrapper = shallow(<TodoApp />)
    wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
    wrapper.find(TodoList).simulate('done', { id: 1, done: true })
    expect(wrapper.state('todos')).to.deep.equal([
      { id: 1, text: 'aaa', done: true }
    ])
  })

  it('delete todo', () => {
    const wrapper = shallow(<TodoApp />)
    wrapper.setState({ todos: [{ id: 1, text: 'aaa', done: false }] })
    wrapper.find(TodoList).simulate('delete', { id: 1 })
    expect(wrapper.state('todos')).to.have.length(0)
  })
})
