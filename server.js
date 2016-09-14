const debug = require('debug')('app')
const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const TodoApp = require('./src/scripts/components/TodoApp').default

const todoApp = React.createFactory(TodoApp)
const dummyStorage = {
  load() {},
  save() {}
}

const app = express()

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.set('etag', false)
app.set('x-powered-by', false)

app.set('port', Number(process.env.PORT || 3000))
app.set('production', process.env.NODE_ENV === 'production')

const manifestPath = require.resolve('./public/manifest.json')

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(todoApp({
    storage: dummyStorage
  }))

  if (!app.get('production')) {
    delete require.cache[manifestPath]
  }
  const manifest = require(manifestPath) // eslint-disable-line global-require

  res.render('index', {
    html,
    stylePath: manifest['styles.css'],
    scriptPath: manifest['scripts.js']
  })
})

app.use(express.static('public'))

app.listen(app.get('port'), () => {
  debug(`Listening on ${app.get('port')} port`)
})
