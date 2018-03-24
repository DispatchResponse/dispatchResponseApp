/**
 * routes/station_apparatus.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const { and, eq, or } = Sequelize.Op

/**
 * Add one or more apparatus to a single station
 */
// TODO: use spread and think about errors (does it kill the array loop? i don't think so)
// http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available
router.post('/:stationId/:apparatusId', function (req, res, next) {
  let stationId = req.params.stationId.toUpperCase()
  let apparatusArr = req.params.apparatusId.toUpperCase().split('&')
  apparatusArr.forEach(eng => {
    let entry = {
      apparatus_id: eng,
      station_id: stationId
    }
    db.station_apparatus.findOrCreate(
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
 * Get one or more apparatus for a single station
 */
router.get('/:stationId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  db.station_apparatus.findAll({
    where: {
      [and]: [
        {
          station_id: {
            [eq]: req.params.stationId.toUpperCase()
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
      res.status(200).send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(501, error)
    })
})

/**
 * Delete one or more apparatus for a single station
 */
router.delete('/:stationId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  db.station_apparatus.findAll({
    where: {
      [and]: [
        {
          apparatus_id: { [or]: apparatus }
        },
        {
          station_id: {
            [eq]: req.params.stationId.toUpperCase()
          }
        }
      ]
    }
  })
    .then(function (findResult) {
      console.log('findResult: ', findResult)
      if (findResult.length !== null && findResult.length > 0) {
        db.station_apparatus.destroy({
          where: {
            [and]: [
              {
                apparatus_id: { [or]: apparatus }
              },
              {
                station_id: {
                  [eq]: req.params.stationId.toUpperCase()
                }
              }
            ]
          }
        })
        console.log('Delete successful 😎 ')
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
 * Get all apparatus for a single station
 */
router.get('/:stationId', async function (req, res, next) {
  db.station_apparatus.findAll({
    where: {
      station_id: req.params.stationId.toUpperCase()
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
 * Get all apparatus for all stations
 */
router.get('/', function (req, res, next) {
  db.station_apparatus.all()
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
