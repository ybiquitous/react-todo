import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import test from 'tape'

import TodoInput from '../TodoInput'

test('render', t => {
  const wrapper = shallow(<TodoInput onCommit={sinon.spy()} />)
  t.equal(wrapper.find('form').length, 1)
  t.equal(wrapper.find('form input').length, 1)
  t.end()
})

test('onCommit', t => {
  const onCommit = sinon.spy()
  const wrapper = shallow(<TodoInput onCommit={onCommit} />)
  wrapper.find('form').simulate('submit', {
    preventDefault() {},
    target: { elements: { todo: { value: ' a ' } } },
  })
  t.equal(onCommit.callCount, 1)
  t.deepEqual(onCommit.args, [[{ value: 'a' }]])
  t.end()
})

test('input', t => {
  const wrapper = shallow(<TodoInput onCommit={sinon.spy()} />)
  const input = wrapper.find('input')
  input.simulate('input', { target: { value: '' } })
  t.equal(input.prop('className'), '')
  t.equal(wrapper.find('p').prop('className'), ' ')
  t.end()
})
