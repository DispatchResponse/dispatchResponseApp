/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')
const Sequelize = require('sequelize')
const { or } = Sequelize.Op

router.get('/tuna', function (req, res, next) {
  var assignment = ['E8', 'E5', 'E4']
  db.users.findAll({
    include: [{
      model: db.trackings,
      where: {
        apparatus_id: { [or]: assignment }
      }
    }]
  })
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

router.put('/:userId', function (req, res, next) {
  console.log("🏉 🏉 🏉 🏉 ")
  db.users.update({
    is_sleeping: req.params.is_sleeping
  }, {
    where: {user_id: req.params.userId}
  })
    .catch(error => {
      console.error(`ERROR in users PUT: ${error}`)
    })
})

module.exports = router
