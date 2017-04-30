import fs from 'fs'
import path from 'path'
import _debug from 'debug'
import express from 'express'
import compression from 'compression'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import TodoApp from './src/scripts/components/TodoApp'

const debug = _debug('app')

const dummyStorage = {
  load() {},
  save() {},
}

const basedir = process.cwd()

const app = express()

app.set('views', path.join(basedir, 'src', 'views'))
app.set('view engine', 'ejs')

app.set('etag', false)
app.set('x-powered-by', false)

app.set('port', Number(process.env.PORT || 3000))
app.set('production', process.env.NODE_ENV === 'production')
app.set('publicDir', path.join(basedir, 'public'))

app.use(compression())

const manifestPath = path.join(app.get('publicDir'), 'assets', 'files.json')
const cachedManifest = new Map()
const manifestKey = 'manifest'
function loadManifest() {
  if (!app.get('production')) {
    return {
      'styles.css': 'styles.css',
      'scripts.css': 'scripts.css',
      'scripts.js': 'scripts.js',
    }
  }
  if (cachedManifest.has(manifestKey)) {
    return cachedManifest.get(manifestKey)
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  Object.entries(manifest).forEach(([key, value]) => {
    manifest[key] = `assets/${value}`
  })
  cachedManifest.set(manifestKey, manifest)
  return manifest
}

app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(React.createElement(TodoApp, {
    storage: dummyStorage,
  }))
  const manifest = loadManifest(manifestPath)
  res.render('index', {
    html,
    stylePath: manifest['styles.css'],
    stylePath2: manifest['scripts.css'],
    scriptPath: manifest['scripts.js'],
  })
})

app.use(express.static(app.get('publicDir')))

app.listen(app.get('port'), () => {
  debug(`Listening on ${app.get('port')} port`)
})
