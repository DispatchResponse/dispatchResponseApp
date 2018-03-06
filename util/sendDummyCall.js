'use strict'

/**
 * util/sendDummyCall.js
 * Sends a dummy call
 *
 */
const data = require('./dummy_data')
const request = require('request')
const cuid = require('cuid')

var dateformat = require('date-fns/format')

const sendDummyCall = () => {
  var today = new Date()
  today = dateformat(today, 'MM-DD-YYYY HH:mm:ss')
  var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1)
  var dummyCall = data.maindata[randomCallNumber]
  dummyCall.rec_dt = today
  dummyCall.test_call = true
  dummyCall.cfs_remark = 'TEST CALL: ' + dummyCall.cfs_remark

  var options = {
    method: 'POST',
    url: 'http://localhost:1337/calls',
    // url: 'https://gfd.dispatch.rustybear.com/calls',
    // url: 'https://testing.dispatch.rustybear.com/calls',
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
