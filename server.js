const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const TodoApp = require('./src/components/TodoApp').default

const todoApp = React.createFactory(TodoApp)
const dummyStorage = {
  load() {},
  save() {}
}

const app = express()

app.set('views', './src')
app.set('view engine', 'ejs')

app.set('port', Number(process.env.PORT || 3000))
app.set('etag', false)
app.set('x-powered-by', false)

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(todoApp({
    storage: dummyStorage
  }))
  res.render('index', { TodoApp: html })
})

app.use(express.static('build'))

app.listen(app.get('port'))
