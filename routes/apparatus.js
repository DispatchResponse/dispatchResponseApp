/**
 * routes/apparatus.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

//TODO:  sort the output
router.get('/', function (req, res, next) {
  db.apparatus.all().then(function (apparatusList) {
    let allApparatus = Object.keys(apparatusList).map(function (k) {
      return apparatusList[k].dataValues
    })
    res.send(allApparatus)
  })
    .catch(error => {
      console.error(`ERROR in apparatus GET: ${error}`)
    })
})

module.exports = router
