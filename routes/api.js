/**
 * routes/api.js
 * @namespace
 *
 */

const express = require('express')
const router = express.Router()
const Call = require('../models/call')   // dynamo

router.get('/', (req, res) => {
/**
 * API to get individual call details
 * @param {string} req.query.slug
 * @returns {object} data call details
 */

  if (req.query.slug) {
    var slug = req.query.slug
    Call.query(slug).exec( (err, data) => {
      if (err) {
        console.error('DYNAMO CALL FETCH ERROR: ', err)
      } else {
        res.send(JSON.stringify(data))
      }
    })
  } else {
    res.send('Please include a reference to slug')
  }
})

module.exports = router
