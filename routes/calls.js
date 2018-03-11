/**
 * routes/calls.js
 */

const express = require('express')
const router = express.Router()
const cuid = require('cuid')
const db = require('../models')
const Sequelize = require('sequelize')
const { or } = Sequelize.Op
const emailTransporter = require('../util/sendEmailSES')

const DEBUG = true // set this to true to suppress sending POST requests to Postgres

/**
 * Get all calls
 */
// TODO:  sort
router.get('/', function (req, res, next) {
  db.calls.all()
    .then(function (callList) {
      let allCalls = Object.keys(callList).map(function (k) {
        return callList[k].dataValues
      })
      res.status(200).send(allCalls)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(501, error)
    })
})

/**
 * Get a specific call and inject the userId into it
 */
router.get('/:slug/:userId', function (req, res, next) {
  db.calls.findAll({
    where: {
      slug: req.params.slug
    }
  })
    .then(function (callDetails) {
      let call = Object.keys(callDetails).map(k => callDetails[k].dataValues)
      call[0].user_id = req.params.userId
      res.status(200).send(call)
    })
    .catch(error => {
      console.error(`ERROR in GET: ${error}`)
      res.sendStatus(501, error)
    })
})

/**
 * Given a list of apparatus, create a list of recipient phone-emails
 */
const getRecipientsAddresses = (apparatusArr) => {
  console.log('IN FUNCTION apparatusArr: ', apparatusArr);
  // what to do about E1 E5 STN5 cases? will it choke on STN5
  db.users.findAll({
    include: [{
      model: db.trackings,
      where: {
        apparatus_id: { [or]: apparatusArr }
      }
    }]
  })
    .then(userList => {
      let allUsers = Object.keys(userList).map(function (k) {
        return userList[k].dataValues
      })
      console.log('allUsers: ', allUsers);
      // process allUsers for:
      // if:
      //   is_sleeping = f
      //   is_enabled = t
      // then:
      //   mobile + carrier
      // return a comma separated string
      return allUsers
    })
    .catch(error => {
      console.error(`ERROR in users GET: ${error}`)
    })
}





/**
 * Prepare and parse data before DB injection and emailing
 */
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

/**
 * Send processed data to Postgres
 */
const sendToPostgres = (processedData) => {
  db.calls.create(processedData)
    .then(processedData => {
      console.log('PG CALL DETAILS:  ', processedData)
    })
    .catch(error => {
      console.error(`ERROR sending to Postgres: ${error}`)
    })
}

/**
 * Send processed data to SMS-via-email
 */
const sendEmail = (data) => {
  emailTransporter.sendMail({
    from: 'postmaster@signalclick.com',
    // to: '2035160005@msg.fi.google.com, 8057060651@vtext.com',
    to: '2035160005@msg.fi.google.com',
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
      console.log(info.envelope)
      console.log(info.messageId)
    }
  })
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
  let apparatusArr = processedData.assignment.split(' ')
  let recipients = await getRecipientsAddresses(apparatusArr)

  if (DEBUG === true) {
    // send to Dynamo and email
    await sendToPostgres(processedData)
    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful but was not sent to SMS`)
  } else {
    await sendToDynamo(processedData)
    sendEmail(processedData)
    res.send(`SUCCESS: Your POST of ${JSON.stringify(processedData)} was successful`)
  }
})

module.exports = router
