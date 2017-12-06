import fs from 'fs'
import path from 'path'
import pino from 'pino'
import express from 'express'
import compression from 'compression'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import TodoApp from './src/scripts/components/TodoApp'

const logger = pino({ prettyPrint: true })

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

function convertManifest(manifest) {
  return Object.entries(manifest).reduce(
    (newManifest, [key, value]) =>
      Object.assign(newManifest, { [key]: `assets/${value}` }),
    {},
  )
}

function loadManifest() {
  if (!app.get('production')) {
    const files = ['styles.css', 'scripts.css', 'scripts.js']
    return convertManifest(
      files.reduce(
        (manifest, name) => Object.assign(manifest, { [name]: name }),
        {},
      ),
    )
  }
  if (cachedManifest.has(manifestKey)) {
    return cachedManifest.get(manifestKey)
  }
  const manifest = convertManifest(
    JSON.parse(fs.readFileSync(manifestPath, 'utf8')),
  )
  cachedManifest.set(manifestKey, manifest)
  return manifest
}

app.get('/', (req, res) => {
  // eslint-disable-next-line react/jsx-filename-extension
  const stream = renderToNodeStream(<TodoApp storage={dummyStorage} />)
  let html = ''
  stream.on('data', chunk => {
    html += chunk
  })
  stream.on('end', () => {
    const manifest = loadManifest(manifestPath)
    res.render('index', {
      html,
      stylePath: manifest['styles.css'],
      stylePath2: manifest['scripts.css'],
      scriptPath: manifest['scripts.js'],
    })
  })
})

app.use(express.static(app.get('publicDir')))

app.listen(app.get('port'), () => {
  logger.info(`Hello React Todo App on port ${app.get('port')}!`)
})
