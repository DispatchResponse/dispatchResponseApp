/**
 * routes/track_user_station.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const { and, eq, or } = Sequelize.Op

/**
 * Add one or more stations for a single user
 */
// TODO: use spread and think about errors (does it kill the array loop? i don't think so)
// http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available
router.post('/:userId/:stationId', function (req, res, next) {
  let userId = req.params.userId
  let stationArr = req.params.stationId.toUpperCase().split('&')
  stationArr.forEach(station => {
    let entry = {
      station_id: station,
      user_id: userId
    }
    db.track_user_station.findOrCreate(
      { where: entry }
    )
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.error(`ERROR sending to Postgres: ${error}`)
      })
  })
  res.sendStatus(201)
})

/**
 * Create or delete a user's selection of stations
 */
router.patch('/:userId/:stationId', function (req, res, next) {
  let userId = req.params.userId
  let stationArr = req.params.stationId.toUpperCase().split('&')
  stationArr.forEach(station => {
    let entry = {
      station_id: station,
      user_id: userId
    }
    db.track_user_station.findOrCreate({ where: entry })
      .spread((tracking, created) => {
        if (created) {
          console.log('Created new tracking user-station entry 😎 ')
          res.sendStatus(201)
        } else {
          db.track_user_station.destroy({
            where: {
              [and]: [
                { station_id: { [eq]: tracking.station_id } },
                { user_id: { [eq]: userId } }
              ]
            }
          })
          console.log('Deleted existing tracking user-station entry 😎 ')
          return res.sendStatus(204)
        }
      })
      .catch(error => {
        console.error(`ERROR sending to Postgres: ${error}`)
        return res.sendStatus(501)
      })
  })
})

/**
 * Get one or more stations for a single user
 */
router.get('/:userId/:stationId', function (req, res, next) {
  let stations = req.params.stationId.toUpperCase().split('&')
  db.track_user_station.findAll({
    where: {
      [and]: [
        {
          user_id: {
            [eq]: req.params.userId
          }
        },
        {
          station_id: {
            [or]: stations
          }
        }
      ]
    }
  })
    .then(function (trackDetails) {
      let allTracks = Object.keys(trackDetails).map(k => trackDetails[k].dataValues)
      res.status(200).send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(501, error)
    })
})

/**
 * Delete one or more stations for a single user
 */
router.delete('/:userId/:stationId', function (req, res, next) {
  let stations = req.params.stationId.toUpperCase().split('&')
  db.track_user_station.findAll({
    where: {
      [and]: [
        {
          station_id: { [or]: stations }
        },
        {
          user_id: {
            [eq]: req.params.userId
          }
        }
      ]
    }
  })
    .then(function (findResult) {
      if (findResult.length !== null && findResult.length > 0) {
        db.track_user_station.destroy({
          where: {
            [and]: [
              {
                station_id: { [or]: stations }
              },
              {
                user_id: {
                  [eq]: req.params.userId
                }
              }
            ]
          }
        })
        console.log('Delete tracking user-stations successful 😎 ')
        return res.sendStatus(204)
      } else {
        return res.sendStatus(404)
      }
    })
    .catch(error => {
      console.error(`ERROR in DELETE: ${error}`)
      res.sendStatus(501, error)
    })
})

/**
 * Get all tracked stations for a single user
 */
router.get('/:userId', async function (req, res, next) {
  db.track_user_station.findAll({
    where: {
      user_id: req.params.userId
    }
  })
    .then(function (trackDetails) {
      let allTracks = []
      if (trackDetails !== null && trackDetails.length > 0) {
        allTracks = Object.keys(trackDetails).map(k => trackDetails[k].dataValues)
      }
      res.status(200).send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(500)
    })
})

/*
 * Get all station trackings for all users
 */
router.get('/', function (req, res, next) {
  db.track_user_station.all()
    .then(function (trackList) {
      let allTracks = Object.keys(trackList).map(function (k) {
        return trackList[k].dataValues
      })
      res.status(200).send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(501)
    })
})

module.exports = router
