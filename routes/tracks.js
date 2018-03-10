/**
 * routes/tracks.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const {or} = Sequelize.Op

router.get('/', function (req, res, next) {
  db.trackings.all().then(function (trackList) {
    let allTracks = Object.keys(trackList).map(function (k) {
      return trackList[k].dataValues
    })
    res.send(allTracks)
  })
})

router.get('/:userId', function (req, res, next) {
  db.trackings.findAll({
    where: {
      user_id: req.params.userId
    }
  })
    .then(function (trackDetails) {
      let allTracks = Object.keys(trackDetails).map(k => trackDetails[k].dataValues)
      res.send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
    })
})

module.exports = router
