/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/tuna', function (req, res, next) {
  db.users.findAll({
    include: [{
      model: db.trackings,
      where: {apparatusId: 'E2'}
      // where: { user_id: db.col('users.user_id')}
    }]
    // attributes: ['userId']
    // where: {apparatusId: 'E2'}
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


router.get('/track', function (req, res, next) {
  db.apparatus.findAll({
    include: [{
      model: db.users,
      through: {
        where: {apparatus_id: 'E2'},
        attributes: ['userId']
      }
    }]
    // attributes: ['userId']
    // where: {apparatus_id: 'E2'}
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

router.get('/squid', function (req, res, next) {
  db.users.findAll({
    include: [{
      model: db.apparatus,
      through: {
        where: {apparatus_id: 'E2'}
      }
    }]
    // attributes: ['userId']
    // where: {apparatusId: 'E2'}
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
    where: {userId: req.params.userId}
  })
  .then(user => {
    // console.log('user.fullName: ', user.fullName)
    // console.log('user.fullMobile: ', user.fullMobile)
    res.send(user)
  })
  .catch(error => {
    console.error(`ERROR in users GET: ${error}`)
  })
})

// router.get('/', function (req, res, next) {
//   console.log('db.users: ', db.apparatus)
//   db.users.findAll()
//   .then(userList => {
//     let allUsers = Object.keys(userList).map(function (k) {
//       return userList[k].dataValues
//     })
//     res.send(allUsers)
//   })
//   .catch(error => {
//     console.error(`ERROR in users GET: ${error}`)
//   })
// })

module.exports = router
