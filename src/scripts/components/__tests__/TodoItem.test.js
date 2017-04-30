import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'ava'

import TodoItem from '../TodoItem'

let props

test.beforeEach(() => {
  props = { id: 1, text: 'aaa' }
})

test('render', (t) => {
  const wrapper = shallow(<TodoItem {...props} />)
  t.true(wrapper.find('input[type="checkbox"]').length === 1)
  t.true(wrapper.find('label').length === 1)
  t.true(wrapper.find('label').text() === 'aaa')
  t.true(wrapper.find('[role="button"]').length === 1)
  t.true(wrapper.find('[role="button"]').text() === '❌')
})

test('onDone', (t) => {
  const onDone = sinon.spy()
  const wrapper = shallow(<TodoItem {...props} onDone={onDone} />)
  wrapper.find('input').simulate('change', {
    target: { checked: true },
  })
  t.true(onDone.callCount === 1)
  t.deepEqual(onDone.args, [[{ id: 1, done: true }]])
})

test('onDelete on click', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoItem {...props} onDelete={onDelete} />)
  wrapper.find('[role="button"]').simulate('click', {})
  t.true(onDelete.callCount === 1)
  t.deepEqual(onDelete.args, [[{ id: 1 }]])
})

test('onDelete on press ENTER', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoItem {...props} onDelete={onDelete} />)
  wrapper.find('[role="button"]').simulate('keypress', { key: 'Enter' })
  t.true(onDelete.callCount === 1)
  t.deepEqual(onDelete.args, [[{ id: 1 }]])
})

test('onDelete on press non-ENTER', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoItem {...props} onDelete={onDelete} />)
  wrapper.find('[role="button"]').simulate('keypress', { key: 'A' })
  t.true(onDelete.callCount === 0)
})
