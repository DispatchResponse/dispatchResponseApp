/**
 * routes/track_user_station.js
 *
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const {and, eq, or} = Sequelize.Op

/**
 * Add one or more stations for a single user
 *
 * TODO: a post here should (1) create an entry in the track_user_station table
 * AND (2) take an array of apparatus from the station and update the
 * track_user_apparatus table for that user and apparatus array
 */
router.post('/:userId/:stationId', function (req, res, next) {
  let userId = req.params.userId
  let stationArr = req.params.stationId.toUpperCase().split('&')
  stationArr.forEach(station => {
    let entry = {
      station_id: station,
      user_id: userId
    }
    db.track_user_station.findOrCreate(
      {
        where: entry
      }
    )
      .then(result => {
        console.log('POST RESULT:  ', result)
      })
      .catch(error => {
        console.error(`ERROR posting to Postgres: ${error}`)
      })
  })
  res.sendStatus(201)
})

/**
 * Create or delete (toggle) a user's selection of stations and all associated
 * apparatus
 */
router.patch('/:userId/:stationId', function (req, res, next) {
  let userId = req.params.userId
  let stationArr = req.params.stationId.toUpperCase().split('&')
  stationArr.forEach(station => {
    let entry = {
      station_id: station,
      user_id: userId
    }
    db.track_user_station.findOrCreate({
      where: entry
    })
      .spread((tracking, created) => {
        if (created) {
          // created a new entry for user-station, now get the apparatus from
          // that station
          return db.station_apparatus.findAll({
            where: {
              station_id: {
                [eq]: station
              }
            }
          })
            .then(result => {
              // next map user-apparatus relationships with the apparatus array
              var apparatusArr = Object.keys(result).map(k => result[k].dataValues.apparatus_id)
              apparatusArr.forEach(eng => {
                let entry = {
                  apparatus_id: eng,
                  user_id: userId
                }
                return db.track_user_apparatus.findOrCreate({
                  where: entry
                })
                  .spread((newTracking, created) => {
                    if (created) {
                      console.log(`SUCCESS: Created new tracking entry for ${newTracking.dataValues.apparatus_id} and user ${userId}.`)
                    } else {
                      console.log(`SUCCESS: Tracking entry for ${newTracking.dataValues.apparatus_id} and user ${userId} previously existed. No action taken.`)
                    }
                  })
                  .catch(error => {
                    console.error(`ERROR with findOrCreate for user_apparatus: ${error}`)
                    return res.sendStatus(501)
                  })
              })
              return res.sendStatus(201)
            })
            .catch(error => {
              console.error(`ERROR getting from Postgres: ${error}`)
            })
        } else {
          db.track_user_station.destroy({
            where: {
              [and]: [
                {
                  station_id: {
                    [eq]: tracking.station_id
                  }
                },
                {
                  user_id: {
                    [eq]: userId
                  }
                }
              ]
            }
          })
            .then(() => {
              return db.station_apparatus.findAll({
                where: {
                  station_id: {
                    [eq]: tracking.station_id
                  }
                }
              })
                .then(result => {
                  var apparatusArr = Object.keys(result).map(k => result[k].dataValues.apparatus_id)
                  apparatusArr.forEach(eng => {
                    let entry = {
                      apparatus_id: eng,
                      user_id: userId
                    }
                    return db.track_user_apparatus.findOne({
                      where: entry
                    })
                      .then(deleteTarget => {
                        return db.track_user_apparatus.destroy({
                          where: {
                            ua_id: deleteTarget.ua_id
                          }
                        })
                          .then(() => {
                            console.log(`SUCCESS: Deleted existing ${deleteTarget.apparatus_id} tracking entry`)
                          })
                          .catch(error => {
                            console.error(`ERROR deleting user-apparatus mapping: ${error}`)
                            return res.sendStatus(501)
                          })
                      })
                      .catch(error => {
                        console.error(`ERROR finding a specific user-apparatus mapping: ${error}`)
                        return res.sendStatus(501)
                      })
                  })
                })
            })
          console.log('Deleted existing tracking user-station entry 😎 ')
          return res.sendStatus(204)
        } // end of destroy section for apparatus
      }) // end of findOrCreate
      .catch(error => {
        console.error(`ERROR sending to Postgres: ${error}`)
        return res.sendStatus(501)
      })
  }) // end of forEach for stations
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
          station_id: {
            [or]: stations
          }
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
                station_id: {
                  [or]: stations
                }
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
