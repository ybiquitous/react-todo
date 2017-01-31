import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import assert from 'assert'

import TodoItem from '../src/scripts/components/TodoItem'
import TodoList from '../src/scripts/components/TodoList'

describe('TodoList', () => {
  let props
  before(() => {
    props = {
      todos: [{ id: 1, text: 'aaa' }, { id: 2, text: 'bbb' }],
    }
  })

  it('render', () => {
    const wrapper = shallow(<TodoList {...props} />)
    assert(wrapper.find(TodoItem).length === 2)
    assert(wrapper.containsMatchingElement(<TodoItem id={1} text="aaa" />))
    assert(wrapper.containsMatchingElement(<TodoItem id={2} text="bbb" />))
  })

  it('onDone', () => {
    const onDone = sinon.spy()
    const wrapper = shallow(<TodoList {...props} onDone={onDone} />)
    wrapper.find(TodoItem).first().simulate('done')
    assert(onDone.callCount === 1)
  })

  it('onDelete', () => {
    const onDelete = sinon.spy()
    const wrapper = shallow(<TodoList {...props} onDelete={onDelete} />)
    wrapper.find(TodoItem).first().simulate('delete')
    assert(onDelete.callCount === 1)
  })
})
