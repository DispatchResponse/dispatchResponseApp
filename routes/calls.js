/**
 * routes/calls.js
 */

const express = require('express')
const router = express.Router()
const cuid = require('cuid')
const subDays = require('date-fns/sub_days')
// const Call = require('../models/call/call-dynamo')
const db = require('../models')
const emailTransporter = require('../util/sendEmailSES')

const DEBUG = true // set this to true to suppress sending POST requests to Dynamo

// GET calls listing for last x numberOfDays
var numberOfDays = 3

// router.get('/', function (req, res, next) {
//   let startDate = subDays(Date.now(), numberOfDays)
//   Call.scan().where('createdAt').gte(startDate).exec( (err, data) => {
//     let allCalls = Object.keys(data.Items).map(function (k) {
//       return data.Items[k].attrs
//     })
//     let sortedCalls = allCalls.slice(0)
//     sortedCalls.sort((a, b) => b.cfs_no - a.cfs_no)
//     let filteredCalls = sortedCalls.filter(call => call.test_call === false )
//     err ?
//       console.error(`DYNAMO FETCH ERROR: ${err}`)
//     :
//       res.send(filteredCalls)
//   })
// })

//TODO:  error proof and sort
router.get('/', function (req, res, next) {
  let startDate = subDays(Date.now(), numberOfDays)
  db.calls.all().then(function (callList) {
    let allCalls = Object.keys(callList).map(function (k) {
      return callList[k].dataValues
    })
    res.send(allCalls)
  })
})

const processData = (data) => {
  let slug = cuid.slug()
  let assignment = data.UnitList.split(',').splice(1).join(' ')
  let radioFreq = data.UnitList.split(',')[0]
  let crossStreet = data.x_street_name.split(' ').splice(3).join(' ')
  let mapRef = data.x_street_name.split(' ').splice(0, 3).join(' ')
  let cfsNo = Number.parseInt(data.cfs_no)
  let callDetails = {
    assignment: assignment,
    radio_freq: radioFreq,
    apt_no: data.apt_no,
    call_category: data.call_category,
    call_description: data.call_description,
    call_type: data.call_type,
    cfs_no: cfsNo,
    cfs_remark: data.cfs_remark,
    city: data.city,
    dispatch_fire: data.dispatch_fire,
    latitude: data.latitude,
    location: data.location,
    longitude: data.longitude,
    premise_name: data.premise_name,
    priority_amb: data.priority_amb,
    priority_fire: data.priority_fire,
    priority_pol: data.priority_pol,
    timeout: data.rec_dt,
    cross_street: crossStreet,
    map_ref: mapRef,
    test_call: data.test_call,
    zip: data.zip,
    slug: slug
  }
  return callDetails
}

const buildRecipientList = (processedData) => {
  let assignment = processedData.assignment
  //  assignment is an array
  // a fancy join between apparatus assigned and the users tracking those
  // apparatus
}

const sendToPostgres = (processedData) => {
  db.calls.create(processedData)
  .then(processedData => {
    console.log('PG CALL DETAILS:  ', processedData)
  })
  .catch(error => {
    // TODO: not sure this is working or correct. creates unhandled promise error
    // To test, misspell processedData above
    throw error
  })
}

const sendToDynamo = (processedData) => {
  var newCall = new Call(processedData)
  newCall.save(function (err) {
    if (err) {
      console.log('err: ', err)
    } else {
      console.log('created new item in DynamoDB calls: ', newCall.get('call_id'))
    }
  })
}

const sendEmail = (data) => {
  emailTransporter.sendMail({
      from: 'postmaster@signalclick.com',
      to: '2035160005@msg.fi.google.com, 8057060651@vtext.com',
      subject: 'GFD Call',
      text: `Call type: ${data.call_category}
Location: ${data.location}  ${data.city}
Assignment: ${data.assignment}
Details: https://ers-dispatch.firebaseapp.com/?id=${data.slug}
      `
  }, (err, info) => {
      if (err) {
          console.error(err)
      } else {
          console.log(info.envelope);
          console.log(info.messageId);
      }
  });
}

// POST calls listing
router.post('/', async function (req, res) {
  let callQuery = null

  if (Object.values(req.query).length !== 0) {
    /* x-www-form-urlencoded, therefore use req.query */
    callQuery = req.query
  } else {
    /* raw, therefore use req.body and JSON.parse it */
    callQuery = JSON.parse(req.body)
  }

  let processedData = await processData(callQuery)

  if (DEBUG === true) {
    // send to Dynamo and email
    await sendToPostgres(processedData)
    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful but was not sent to Dynamo or Postgres`)
  } else {
    await sendToDynamo(processedData)
    sendEmail(processedData)
    res.send(`SUCCESS: Your POST of ${JSON.stringify(processedData)} was successful`)
  }
})

module.exports = router
