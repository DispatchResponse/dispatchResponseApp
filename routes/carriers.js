/**
 * routes/carriers.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

//TODO:  error proof and sort
router.get('/', function (req, res, next) {
  db.carriers.all().then(function (carriersList) {
    let allCarriers = Object.keys(carriersList).map(function (k) {
      return carriersList[k].dataValues
    })
    res.send(allCarriers)
  })
})

module.exports = router
