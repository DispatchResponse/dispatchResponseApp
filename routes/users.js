/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

//TODO:  error proof and sort
router.get('/', function (req, res, next) {
  db.users.all().then(function (userList) {
    let allUsers = Object.keys(userList).map(function (k) {
      return userList[k].dataValues
    })
    res.send(allUsers)
  })
})

module.exports = router
