import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'tape'

import TodoItem from '../TodoItem'
import TodoList from '../TodoList'

const props = () => ({
  todos: [{ id: 1, text: 'aaa' }, { id: 2, text: 'bbb' }],
})

test('render', (t) => {
  const wrapper = shallow(<TodoList {...props()} />)
  t.equal(wrapper.find(TodoItem).length, 2)
  t.ok(wrapper.containsMatchingElement(<TodoItem id={1} text="aaa" />))
  t.ok(wrapper.containsMatchingElement(<TodoItem id={2} text="bbb" />))
  t.end()
})

test('onDone', (t) => {
  const onDone = sinon.spy()
  const wrapper = shallow(<TodoList {...props()} onDone={onDone} />)
  wrapper.find(TodoItem).first().simulate('done')
  t.equal(onDone.callCount, 1)
  t.end()
})

test('onDelete', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoList {...props()} onDelete={onDelete} />)
  wrapper.find(TodoItem).first().simulate('delete')
  t.equal(onDelete.callCount, 1)
  t.end()
})
