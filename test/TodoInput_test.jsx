import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'

import TodoInput from '../app/components/TodoInput'

describe('<TodoInput />', () => {
  it('render <input />', () => {
    const wrapper = shallow(<TodoInput onCommit={() => {}} />)
    expect(wrapper.find('input')).to.have.length(1)
  })

  it('simulate commit event', () => {
    const onCommit = sinon.spy()
    const wrapper = shallow(<TodoInput onCommit={onCommit} />)
    wrapper.find('input').simulate('keyPress', {
      key: 'Enter',
      target: { value: ' a ' }
    })
    expect(onCommit).to.have.property('callCount', 1)
    expect(onCommit).to.have.property('args').that.deep.equals([['a']])
  })
})
