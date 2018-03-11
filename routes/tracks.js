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
router.post('/:userId/:apparatusId', function (req, res, next) {
  let apparatus = req.params.apparatusId.toUpperCase().split('&')
  // TODO: implement a loop for each element in apparatus array
  let entry = {
    apparatus_id: req.params.apparatusId,
    user_id: req.params.userId
  }
  db.trackings.findOrCreate(
    { where: entry }
  )
  // TODO: use spread
  // http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available
    .then(result => {
      console.log(result)
      res.sendStatus(204)
    })
    .catch(error => {
      console.error(`ERROR sending to Postgres: ${error}`)
      res.sendStatus(500)
    })
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
      res.send(allTracks)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
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
      res.sendStatus(500, error)
    })
})

/**
 * Get all tracked apparatus for a single user
 */
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

/*
 * Get all trackings for all users
 */
router.get('/', function (req, res, next) {
  db.trackings.all().then(function (trackList) {
    let allTracks = Object.keys(trackList).map(function (k) {
      return trackList[k].dataValues
    })
    res.send(allTracks)
  })
})

module.exports = router
