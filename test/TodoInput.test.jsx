import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import assert from 'assert'

import TodoInput from '../src/scripts/components/TodoInput'

describe('TodoInput', () => {
  it('render', () => {
    const wrapper = shallow(<TodoInput onCommit={sinon.spy()} />)
    assert(wrapper.find('form').length === 1)
    assert(wrapper.find('form input').length === 1)
  })

  it('onCommit', () => {
    const onCommit = sinon.spy()
    const wrapper = shallow(<TodoInput onCommit={onCommit} />)
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
      target: { elements: { todo: { value: ' a ' } } },
    })
    assert(onCommit.callCount === 1)
    assert.deepStrictEqual(onCommit.args, [[{ value: 'a' }]])
  })
})
