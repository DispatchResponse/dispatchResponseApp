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

var dateformat = require('date-fns/format')
const getToday = () => {
  var d = new Date()
  return dateformat(d, 'MM-DD-YYYY HH:mm:ss')
}

const DEBUG = false // Set this to 'true' to activate console logging of several important variables

/**
 * Get all calls ordered by created_at DESC
 */
router.get('/', function (req, res, next) {
  db.calls.all({
    order: [['created_at', 'DESC']]
  })
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
  // TODO: what to do about E1 E5 STN5 cases? will it choke on STN5?
  return db.users.findAll({
    include: [{
      model: db.track_user_apparatus,
      where: {
        apparatus_id: { [or]: apparatusArr }
      }
    }],
    where: {
      is_sleeping: false
    }
  })
    .then(userList => {
      if (DEBUG) { console.log('😎  userList: ', userList) }
      let userAddresses = Object.keys(userList).map(function (k) {
        if (userList[k].dataValues.is_enabled === true && userList[k].dataValues.is_sleeping === false) {
          return {
            'address': userList[k].dataValues.mobile + userList[k].dataValues.carrier,
            'userId': userList[k].dataValues.user_id,
            'isAdmin': userList[k].dataValues.is_admin
          }
        }
      })
      if (DEBUG) { console.log('😎  userAddresses:', userAddresses) }
      return userAddresses
    })
    .catch(error => {
      console.error(`ERROR in users GET: ${error}`)
    })
}

/**
 * Prepare and parse data before DB injection and emailing
 * TODO: parse logic to deal with cases of no apparatus assignment but radio
 * freq is listed and other cases during busy times
 * TODO: is UnitList always comma separated?  sometimes i think not yet we
 * assume it is. can we deal with it if it is space separated? yes, but what if
 * it is comma separated between radioFreq and engines but within the engines
 * it is space separated?  much more difficult.
 */
const processData = (data) => {
  let slug = cuid.slug()
  let assignment = data.UnitList.split(',').splice(1).join(' ').trim()
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
      console.log('Successful write to Postgres: ', getToday())
    })
    .catch(error => {
      console.error('ERROR sending to Postgres: ', getToday(), error)
    })
}

/**
 * Send processed data to SMS-via-email
 */
const sendEmail = (data, recipient) => {
// Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: [ recipient.address ]
    },
    Message: {
      Body: {
        Html: {
         Charset: "UTF-8",
         Data: `<p>Details: https://gfd.gr/${data.slug}/${recipient.userId}</p>
          <p>Call type: ${data.call_category}</p>
          <p>Location: ${data.location}  ${data.city}</p>
          <p>Assignment: ${data.assignment}</p>`
        },
        Text: {
         Charset: "UTF-8",
         Data: `Details: https://gfd.gr/${data.slug}/${recipient.userId}
Call type: ${data.call_category}
Location: ${data.location}  ${data.city}
Assignment: ${data.assignment}`
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'GFD Call'
       }
      },
    Source: 'no-reply@dispatchresponse.com',
    ReplyToAddresses: [
        'no-reply@dispatchresponse.com',
    ],
  };
  // Send the email
  emailTransporter.sendEmail(params).promise().then(
    function(data) {
      console.log(`Email sent successfully: ${data.MessageId}`);
    }).catch(
      function(err) {
      console.error(`ERROR: Email not sent --> ${err} ${err.stack}`);
    });
}

/**
 * Process (POST) a new incoming call
 */
router.post('/', async function (req, res) {
  let callQuery = null

  if (Object.values(req.query).length !== 0) {
    /* x-www-form-urlencoded, therefore use req.query */
    callQuery = req.query
  } else {
    /* raw, therefore use req.body and JSON.parse it */
    callQuery = JSON.parse(req.body)
  }

  // logging to figure out what Dispatch is sending sometimes
  console.log('HEY DISPATCH SENT THIS: ', callQuery);

  let processedData = await processData(callQuery)
  if (DEBUG) { console.log('processedData: ', processedData) }
  let apparatusArr = processedData.assignment.split(' ').filter(app => app !== '')
  if (DEBUG) { console.log('😎  apparatusArr: ', apparatusArr) }
  let recipientsArr = await getRecipientsAddresses(apparatusArr)
  if (DEBUG) { console.log('😎  recipientsArr: ', recipientsArr) }

  if (processedData.test_call) {
    // send to Postgres and send email-SMS just to admins
    await sendToPostgres(processedData)
    if (recipientsArr !== undefined && recipientsArr.length > 0) {
      recipientsArr.forEach(email => {
        if (email.isAdmin) {
          sendEmail(processedData, email)
        }
      })
    }
    console.log('PRE-POSTGRES-WRITE: ', getToday(),  processedData)
    res.send(`DEBUG:  Your POST of ${JSON.stringify(callQuery)} was successful and was sent to SMS ADMINS`)
  } else {
    // this is a real call, so send to Postgres and email-SMS real users
    console.log('PRE-POSTGRES-WRITE: ', getToday(),  processedData)
    await sendToPostgres(processedData)
    if (recipientsArr !== undefined && recipientsArr.length > 0) {
      recipientsArr.forEach(email => sendEmail(processedData, email))
    }
    res.send(`SUCCESS: Your POST of ${JSON.stringify(processedData)} was successful and was sent to SMS`)
  }
})

module.exports = router
