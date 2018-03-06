'use strict';

/*
 * util/callGenerator.js
 *
 */

const data = require('./dummy_data');
const nodemailer = require('nodemailer');
const process = require('process');
const request = require('request');
const schedule = require('node-schedule');

var dateformat = require('date-fns/format');
var today = new Date();
today = dateformat(today, 'MM-DD-YYYY HH:mm:ss');

const EPASSWD = process.env.EPASSWD;

let mailTransport = nodemailer.createTransport('smtps://emergency.response.solutions1@gmail.com:' + EPASSWD + '@smtp.gmail.com');
let email = 'kevin@rustybear.com';

// function sendNotificationEmail(email) {
const sendNotificationEmail = (email, text) => {
  let mailOptions = {
    from: '"ERS Errors" <noreply@rustybear.com>',
    to: email,
    subject: 'ERROR in ERS code',
    text: text
  };
  return mailTransport.sendMail(mailOptions).then(function() {
    console.log('An email has been sent to: ' + email);
  });
};

/**
 * Generate dummy calls on hour and minute
 * @param {number} rule.hour
 * @param {number} rule.minute
 */
const startDummyCalls = () => {
  var rule = new schedule.RecurrenceRule();
  rule.hour = 16;
  rule.minute = 10;

  schedule.scheduleJob(rule, function() {
    const tableName = '/gfdDispatches/';
    var randomCallNumber = Math.floor(Math.random() * data.maindata.length + 1);
    var dummyCall = data.maindata[randomCallNumber];
    dummyCall.rec_dt = today;
    dummyCall.cfs_remark = 'TEST CALL: ' + dummyCall.cfs_remark;

    var options = {
      method: 'POST',
      // url: 'http://localhost:1337/calls',
      url: 'https://gfd.dispatch.rustybear.com/calls',
      qs: dummyCall,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    request(options, function(error, response, body) {
      if (error) {
        sendNotificationEmail(email, error);
        throw new Error(error);
      } else {
        console.log(body);
      }
    });
  });
};
module.exports = {
  startDummyCalls: startDummyCalls
};
