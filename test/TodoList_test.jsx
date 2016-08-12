import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import TodoItem from '../app/components/TodoItem'
import TodoList from '../app/components/TodoList'

describe('TodoList', () => {
  let props
  before(() => {
    props = {
      todos: [{ id: 1, text: 'aaa' }, { id: 2, text: 'bbb' }]
    }
  })

  it('render', () => {
    const wrapper = shallow(<TodoList {...props} />)
    expect(wrapper.find(TodoItem)).to.have.length(2)
    expect(wrapper.containsMatchingElement(
      <TodoItem id={1} text="aaa" />
    )).to.equal(true)
    expect(wrapper.containsMatchingElement(
      <TodoItem id={2} text="bbb" />
    )).to.equal(true)
  })

  it('onDone', () => {
    const onDone = sinon.spy()
    const wrapper = shallow(<TodoList {...props} onDone={onDone} />)
    wrapper.find(TodoItem).first().simulate('done')
    expect(onDone).to.have.property('callCount', 1)
  })

  it('onDelete', () => {
    const onDelete = sinon.spy()
    const wrapper = shallow(<TodoList {...props} onDelete={onDelete} />)
    wrapper.find(TodoItem).first().simulate('delete')
    expect(onDelete).to.have.property('callCount', 1)
  })
})
