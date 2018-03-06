/**
 * routes/stations.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

//TODO:  error proof and sort
router.get('/', function (req, res, next) {
  db.stations.all().then(function (stationList) {
    let allStations = Object.keys(stationList).map(function (k) {
      return stationList[k].dataValues
    })
    res.send(allStations)
  })
})

module.exports = router
