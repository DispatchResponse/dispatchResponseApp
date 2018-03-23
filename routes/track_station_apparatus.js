/**
 * routes/track_station_apparatus.js
 *
 */

/* WARNING WARNING  WARNING  WARNING  WARNING  WARNING
 *
 * TODO: This page is completely unfinished.  Do not use.
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const { and, eq, or } = Sequelize.Op

/**
 * Add one or more apparatus for a single user
 */
// TODO: use spread and think about errors (does it kill the array loop? i don't think so)
// http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available
router.post('/:userId/:apparatusId', function (req, res, next) {
  let userId = req.params.userId
  let apparatusArr = req.params.apparatusId.toUpperCase().split('&')
  apparatusArr.forEach(eng => {
    let entry = {
      apparatus_id: eng,
      user_id: userId
    }
    db.track_user_apparatus.findOrCreate(
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
 * Create or delete a user's selection of apparatus
 */
router.patch('/:userId/:apparatusId', function (req, res, next) {
  let userId = req.params.userId
  let apparatusArr = req.params.apparatusId.toUpperCase().split('&')
  apparatusArr.forEach(eng => {
    let entry = {
      apparatus_id: eng,
      user_id: userId
    }
    db.track_user_apparatus.findOrCreate({ where: entry })
      .spread((tracking, created) => {
        if (created) {
          console.log('Created new tracking entry 😎 ')
          res.sendStatus(201)
        } else {
          db.track_user_apparatus.destroy({
            where: {
              [and]: [
                { apparatus_id: { [eq]: tracking.apparatus_id } },
                { user_id: { [eq]: userId } }
              ]
            }
          })
          console.log('Deleted existing tracking entry 😎 ')
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
 * Get one or more apparatus for a single user
 */
router.get('/:userId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  db.track_user_apparatus.findAll({
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
      res.status(200).send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(501, error)
    })
})

/**
 * Delete one or more apparatus for a single user
 */
router.delete('/:userId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  db.track_user_apparatus.findAll({
    where: {
      [and]: [
        {
          apparatus_id: { [or]: apparatus }
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
      console.log('findResult: ', findResult)
      if (findResult.length !== null && findResult.length > 0) {
        db.track_user_apparatus.destroy({
          where: {
            [and]: [
              {
                apparatus_id: { [or]: apparatus }
              },
              {
                user_id: {
                  [eq]: req.params.userId
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
 * Get all tracked apparatus for a single user
 */
router.get('/:userId', async function (req, res, next) {
  db.track_user_apparatus.findAll({
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
 * Get all trackings for all users
 */
router.get('/', function (req, res, next) {
  db.track_user_apparatus.all()
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
