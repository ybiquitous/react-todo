import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'ava'

import TodoItem from '../TodoItem'
import TodoList from '../TodoList'

let props

test.beforeEach(() => {
  props = {
    todos: [{ id: 1, text: 'aaa' }, { id: 2, text: 'bbb' }],
  }
})

test('render', (t) => {
  const wrapper = shallow(<TodoList {...props} />)
  t.true(wrapper.find(TodoItem).length === 2)
  t.true(wrapper.containsMatchingElement(<TodoItem id={1} text="aaa" />))
  t.true(wrapper.containsMatchingElement(<TodoItem id={2} text="bbb" />))
})

test('onDone', (t) => {
  const onDone = sinon.spy()
  const wrapper = shallow(<TodoList {...props} onDone={onDone} />)
  wrapper.find(TodoItem).first().simulate('done')
  t.true(onDone.callCount === 1)
})

test('onDelete', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoList {...props} onDelete={onDelete} />)
  wrapper.find(TodoItem).first().simulate('delete')
  t.true(onDelete.callCount === 1)
})
