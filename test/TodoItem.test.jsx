import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import TodoItem from '../src/scripts/components/TodoItem'

describe('TodoItem', () => {
  let props
  before(() => {
    props = { id: 1, text: 'aaa' }
  })

  it('render', () => {
    const wrapper = shallow(<TodoItem {...props} />)
    expect(wrapper.find('input[type="checkbox"]')).to.have.length(1)
    expect(wrapper.find('label')).to.have.length(1)
    expect(wrapper.find('label').text()).to.equal('aaa')
    expect(wrapper.find('a')).to.have.length(1)
    expect(wrapper.find('a').text()).to.equal('❌')
  })

  it('onDone', () => {
    const onDone = sinon.spy()
    const wrapper = shallow(<TodoItem {...props} onDone={onDone} />)
    wrapper.find('input').simulate('change', {
      target: { checked: true },
    })
    expect(onDone).to.have.property('callCount', 1)
    expect(onDone).to.have.property('args')
      .that.deep.equals([[{ id: 1, done: true }]])
  })

  it('onDelete', () => {
    const onDelete = sinon.spy()
    const wrapper = shallow(<TodoItem {...props} onDelete={onDelete} />)
    wrapper.find('a').simulate('click', {
      preventDefault() {},
    })
    expect(onDelete).to.have.property('callCount', 1)
    expect(onDelete).to.have.property('args')
      .that.deep.equals([[{ id: 1 }]])
  })
})
