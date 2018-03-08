/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/:userId', function (req, res, next) {
})

// TODO:  error proof and sort
router.get('/', function (req, res, next) {
  db.users.all().then(function (userList) {
    let allUsers = Object.keys(userList).map(function (k) {
      console.log('HEY HEY db: ', userList[k].fullMobile)
      return userList[k].dataValues
    })
    res.send(allUsers)
  })
})

module.exports = router
