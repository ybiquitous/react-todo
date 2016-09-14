const path = require('path')
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
app.set('publicDir', path.join(__dirname, 'public'))

const manifestPath = path.join(app.get('publicDir'), 'assets.json')
const loadManifest = () => {
  if (!app.get('production')) {
    delete require.cache[manifestPath]
  }
  return require(manifestPath) // eslint-disable-line global-require
}

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(todoApp({
    storage: dummyStorage
  }))
  const manifest = loadManifest(manifestPath)
  res.render('index', {
    html,
    stylePath: manifest['styles.css'],
    scriptPath: manifest['scripts.js']
  })
})

app.get('/service-worker.js', (req, res) => {
  const manifest = loadManifest(manifestPath)
  res.sendFile(manifest['service-worker.js'], { root: app.get('publicDir') })
})

app.use(express.static(app.get('publicDir')))

app.listen(app.get('port'), () => {
  debug(`Listening on ${app.get('port')} port`)
})
