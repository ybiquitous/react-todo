import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import assert from 'assert'

import TodoItem from '../src/scripts/components/TodoItem'

describe('TodoItem', () => {
  let props
  before(() => {
    props = { id: 1, text: 'aaa' }
  })

  it('render', () => {
    const wrapper = shallow(<TodoItem {...props} />)
    assert(wrapper.find('input[type="checkbox"]').length === 1)
    assert(wrapper.find('label').length === 1)
    assert(wrapper.find('label').text() === 'aaa')
    assert(wrapper.find('.delete').length === 1)
    assert(wrapper.find('.delete').text() === '❌')
  })

  it('onDone', () => {
    const onDone = sinon.spy()
    const wrapper = shallow(<TodoItem {...props} onDone={onDone} />)
    wrapper.find('input').simulate('change', {
      target: { checked: true },
    })
    assert(onDone.callCount === 1)
    assert.deepStrictEqual(onDone.args, [[{ id: 1, done: true }]])
  })

  it('onDelete', () => {
    const onDelete = sinon.spy()
    const wrapper = shallow(<TodoItem {...props} onDelete={onDelete} />)
    wrapper.find('.delete').simulate('click', {})
    assert(onDelete.callCount === 1)
    assert.deepStrictEqual(onDelete.args, [[{ id: 1 }]])
  })
})
