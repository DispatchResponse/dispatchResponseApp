/**
 * routes/users.js
 */

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Apparatus = require('../models/apparatus')
const Station = require('../models/station')
const Carrier = require('../models/carrier')
const db = require('../models')

// // GET all users listing
// router.get('/', function (req, res, next) {
//     var user = req.query.mobile
//     User.scan().exec( (err, data) => {
//       if (err) {
//         console.error('DYNAMO USER FETCH ERROR: ', err)
//       } else {
//         // res.send(JSON.stringify(data))
//         res.send(data)
//       }
//     })
// })

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
