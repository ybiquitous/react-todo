const assert = require('assert')

describe('TODO List', () => {
  it('initial', () => {
    browser.url('/')
    assert.strictEqual(browser.getTitle(), 'TODO List')
    assert.strictEqual(browser.getText('h1'), 'TODO List0')
    assert.strictEqual(browser.getValue('input[type="text"]'), '')
  })

  it('add TODO', () => {
    browser.url('/')
    browser.setValue('input[type="text"]', 'abc')
    browser.submitForm('form')
    assert.strictEqual(browser.getText('label'), 'abc')
    assert.strictEqual(browser.isSelected('input[type="checkbox"]'), false)
  })

  it('make TODO done', () => {
    browser.url('/')
    browser.click('input[type="checkbox"]')
    assert.strictEqual(browser.isSelected('input[type="checkbox"]'), true)
  })

  it('delete TODO', () => {
    browser.url('/')
    browser.click('.delete')
    assert.strictEqual(browser.isExisting('input[type="checkbox"]'), false)
    assert.strictEqual(browser.isExisting('label'), false)
  })
})
