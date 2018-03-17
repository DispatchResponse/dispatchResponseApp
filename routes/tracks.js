/**
 * routes/tracks.js
 *
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
    db.trackings.findOrCreate(
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
 * Get one or more apparatus for a single user
 */
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
  db.trackings.findAll({
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
        db.trackings.destroy({
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
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
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
  db.trackings.findAll({
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
  db.trackings.all()
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
