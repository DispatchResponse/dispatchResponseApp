/**
 * routes/apparatus.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

//TODO:  error proof and sort
router.get('/', function (req, res, next) {
  db.apparatus.all().then(function (apparatusList) {
    let allApparatus = Object.keys(apparatusList).map(function (k) {
      return apparatusList[k].dataValues
    })
    res.send(allApparatus)
  })
})

module.exports = router
