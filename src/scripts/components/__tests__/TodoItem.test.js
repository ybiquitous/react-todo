import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'tape'

import TodoItem from '../TodoItem'

const props = () => ({ id: 1, text: 'aaa' })

test('render', (t) => {
  const wrapper = shallow(<TodoItem {...props()} />)
  t.equal(wrapper.find('input[type="checkbox"]').length, 1)
  t.equal(wrapper.find('label').length, 1)
  t.equal(wrapper.find('label').text(), 'aaa')
  t.equal(wrapper.find('[role="button"]').length, 1)
  t.equal(wrapper.find('[role="button"]').text(), '❌')
  t.end()
})

test('onDone', (t) => {
  const onDone = sinon.spy()
  const wrapper = shallow(<TodoItem {...props()} onDone={onDone} />)
  wrapper.find('input').simulate('change', {
    target: { checked: true },
  })
  t.equal(onDone.callCount, 1)
  t.deepEqual(onDone.args, [[{ id: 1, done: true }]])
  t.end()
})

test('onDelete on click', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoItem {...props()} onDelete={onDelete} />)
  wrapper.find('[role="button"]').simulate('click', {})
  t.equal(onDelete.callCount, 1)
  t.deepEqual(onDelete.args, [[{ id: 1 }]])
  t.end()
})

test('onDelete on press ENTER', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoItem {...props()} onDelete={onDelete} />)
  wrapper.find('[role="button"]').simulate('keypress', { key: 'Enter' })
  t.equal(onDelete.callCount, 1)
  t.deepEqual(onDelete.args, [[{ id: 1 }]])
  t.end()
})

test('onDelete on press non-ENTER', (t) => {
  const onDelete = sinon.spy()
  const wrapper = shallow(<TodoItem {...props()} onDelete={onDelete} />)
  wrapper.find('[role="button"]').simulate('keypress', { key: 'A' })
  t.equal(onDelete.callCount, 0)
  t.end()
})
