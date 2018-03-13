/**
 * app.js
 *
 */

const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const morgan = require('morgan')
const path = require('path')
const requestIp = require('request-ip')

var index = require('./routes/index')
var apparatus = require('./routes/apparatus')
var calls = require('./routes/calls')
var carriers = require('./routes/carriers')
var stations = require('./routes/stations')
var tracks = require('./routes/tracks')
var users = require('./routes/users')

var callMaker = require('./util/callGenerator.js')

const NODE_ENV = process.env.NODE_ENV
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const configProd = require('./webpack.prod.js')
let config = require('./webpack.dev.js')
if (NODE_ENV === 'production') {
  config = configProd
}
const compiler = webpack(config)
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

/** morgan - log only 4xx and 5xx responses to console */
app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400
    }
  })
)

// middleware
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))
app.use(cors(corsOptions))
app.use(requestIp.mw())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/*' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api/apparatus', apparatus)
app.use('/api/calls', calls)
app.use('/api/carriers', carriers)
app.use('/api/stations', stations)
app.use('/api/tracks', tracks)
app.use('/api/users', users)
app.use('/api', calls)
app.use('/calls', calls)
app.use('/', calls)

app.use(function (req, res, next) {
  var err = new Error('Not found today')
  err.status = 400
  next(err)
})

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
app.use(error404)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed with xhr' })
  } else {
    next(err)
  }
}

function errorHandler (err, res, req, next) {
  res.status(500)
  console.log('hey')
  // res.send('error', { error: err})
  next(err)
}

function error404 (err, req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  console.log('hey dude - you have an error')
  // TODO: direct this to the NotFound component
}

module.exports = app
