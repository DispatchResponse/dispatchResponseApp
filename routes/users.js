/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const { or, and } = Sequelize.Op

router.get('/:userId', function (req, res, next) {
  db.users.findOne({
    where: {user_id: req.params.userId}
  })
    .then(user => {
      // console.log('user.full_name: ', user.full_name)
      // console.log('user.full_mobile: ', user.full_mobile)
      res.send(user)
    })
    .catch(error => {
      console.error(`ERROR in users GET: ${error}`)
    })
})

router.get('/', function (req, res, next) {
  console.log('db.users: ', db.apparatus)
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

router.patch('/:userId', function (req, res, next) {
  const bodyData = JSON.parse(req.body)
  db.users.find({
    where: {user_id: req.params.userId}
  })
    .then(user => {
      return user.update(bodyData)
    })
    .then(updatedUser => {
      console.log(`UPDATED USER SLEEP STATUS: ${updatedUser}`)
      return res.sendStatus(201)
    })
    .catch(error => {
      console.error(`ERROR in users-sleep PATCH: ${error}`)
    })
})

module.exports = router
