import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'ava'

import TodoInput from '../src/scripts/components/TodoInput'

test('render', (t) => {
  const wrapper = shallow(<TodoInput onCommit={sinon.spy()} />)
  t.true(wrapper.find('form').length === 1)
  t.true(wrapper.find('form input').length === 1)
})

test('onCommit', (t) => {
  const onCommit = sinon.spy()
  const wrapper = shallow(<TodoInput onCommit={onCommit} />)
  wrapper.find('form').simulate('submit', {
    preventDefault() {},
    target: { elements: { todo: { value: ' a ' } } },
  })
  t.true(onCommit.callCount === 1)
  t.deepEqual(onCommit.args, [[{ value: 'a' }]])
})
