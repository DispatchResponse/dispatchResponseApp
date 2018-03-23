'use strict'

/**
 * util/sendDummyCall.js
 * Sends a dummy call
 *
 */

const data = require('./dummy_data')
// const data = require('./badCall')

const request = require('request')

var dateformat = require('date-fns/format')

const getDate = () => {
  var d = new Date()
  return dateformat(d, 'MM-DD-YYYY HH:mm:ss')
}

const sendDummyCall = async () => {
  let today = await getDate()
  var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1)
  var dummyCall = data.maindata[randomCallNumber]
  dummyCall.rec_dt = today
  dummyCall.cfs_remark = 'TEST CALL: ' + dummyCall.cfs_remark

  var options = {
    method: 'POST',
    // url: 'http://localhost:1337/calls',
    url: 'https://gfd.gr/calls',
    // url: 'https://testing.gfd.gr/calls',
    qs: dummyCall,
    headers: {
      'content-type': 'application/json'
    }
  }
  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error)
    } else {
      console.log(body)
    }
  })
}

sendDummyCall()
