/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/:userId', function (req, res, next) {
  db.users.findOne({
    where: {userId: req.params.userId}
  })
  .then(user => {
    res.send(user)
  })
  .catch(error => {
    console.error(`ERROR in users GET: ${error}`)
  })
})

// TODO:  error proof and sort
router.get('/', function (req, res, next) {
  db.users.findAll()
  .then(userList => {
    let allUsers = Object.keys(userList).map(function (k) {
      return userList[k].dataValues
    })
    res.send(allUsers)
  })
  .catch(error => {
    console.error(`ERROR in users GET: ${error}`)
  })
})

module.exports = router
