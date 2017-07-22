import { Selector } from 'testcafe'

fixture `TODO List`
  .page `http://localhost:3000`

test('initial', async (t) => {
  await t
    .expect(Selector('title').textContent).eql('TODO List')
    .expect(Selector('h1').textContent).eql('TODO List0')
    .expect(Selector('input[type="text"]').value).eql('')
})

test('add TODO', async (t) => {
  await t
    .typeText('input[type="text"]', 'abc')
    .pressKey('enter')
    .expect(Selector('label').textContent).eql('abc')
    .expect(Selector('input[type="checkbox"]').checked).eql(false)
})

test('make TODO done', async (t) => {
  await t
    .typeText('input[type="text"]', 'def')
    .pressKey('enter')
    .click('input[type="checkbox"]')
    .expect(Selector('input[type="checkbox"]').checked).eql(true)
})

test('delete TODO', async (t) => {
  await t
    .typeText('input[type="text"]', 'xyz')
    .pressKey('enter')
    .click('[role="button"]')
    .expect(Selector('input[type="checkbox"]').exists).eql(false)
    .expect(Selector('label').exists).eql(false)
})
