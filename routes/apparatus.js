/**
 * routes/apparatus.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

/**
 * Returns a complete list of apparatus by apparatus_id in ascending order
 */
router.get('/', function (req, res, next) {
  db.apparatus.all({
    order: [
      ['apparatus_id', 'ASC']
    ]
  }).then(function (apparatusList) {
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
