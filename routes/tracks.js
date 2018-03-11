/**
 * routes/tracks.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const { and, eq, or } = Sequelize.Op

router.get('/:userId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  db.trackings.findAll({
    where: {
      [and]: [
        {
          user_id: {
            [eq]: req.params.userId
          }
        },
        {
          apparatus_id: {
            [or]: apparatus
          }
        }
      ]
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

// TODO: implement delete of one or more tracking apparatus
router.delete('/:userId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  db.trackings.destroy({
    where: {
    }
  })
    .then(function () {
      res.send()
    })
    .catch(error => {
      console.error(`ERROR in DELETE: ${error}`)
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

router.get('/', function (req, res, next) {
  db.trackings.all().then(function (trackList) {
    let allTracks = Object.keys(trackList).map(function (k) {
      return trackList[k].dataValues
    })
    res.send(allTracks)
  })
})

module.exports = router
