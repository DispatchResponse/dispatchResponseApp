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
var trackUserApparatus = require('./routes/track_user_apparatus')
var users = require('./routes/users')

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
app.use('/api/track_user_apparatus', trackUserApparatus)
app.use('/api/users', users)
app.use('/api', calls)
app.use('/calls', calls)
// app.use('/', calls)

// app.use(function (req, res, next) {
//   var err = new Error('Not found today')
//   err.status = 400
//   next(err)
// })

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

app.get('/user-settings', (req, res) => {
  res.send(`<!DOCTYPE html><html> <head> <meta charset="utf-8"> <title>Dispatch Response</title> <style>@font-face{font-family: 'VT323'; font-style: normal; font-weight: 400; src: local('VT323 Regular'), local('VT323-Regular'), url(https://fonts.gstatic.com/s/vt323/v9/pxiKyp0ihIEF2isfFJXUdVNF.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}.container{display: flex; height: 100vh; width:100vw; justify-content: center; align-items: center; background-color: white;}.title{color: firebrick; font-family: 'VT323', monospace; font-size: 2em;}</style> </head> <body> <div class="container"> <div class="title">Dispatch Response can only be accessed from text message.</div></div></body></html>`);
});

app.get('/dispatch-history', (req, res) => {
  res.send(`<!DOCTYPE html><html> <head> <meta charset="utf-8"> <title>Dispatch Response</title> <style>@font-face{font-family: 'VT323'; font-style: normal; font-weight: 400; src: local('VT323 Regular'), local('VT323-Regular'), url(https://fonts.gstatic.com/s/vt323/v9/pxiKyp0ihIEF2isfFJXUdVNF.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}.container{display: flex; height: 100vh; width:100vw; justify-content: center; align-items: center; background-color: white;}.title{color: firebrick; font-family: 'VT323', monospace; font-size: 2em;}</style> </head> <body> <div class="container"> <div class="title">Dispatch Response can only be accessed from text message.</div></div></body></html>`);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});

module.exports = app
