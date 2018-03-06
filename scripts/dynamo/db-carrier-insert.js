/**
 * scripts/db-carrier-insert.js
 *
 */

const dynamo = require('dynamodb')
const AWS = dynamo.AWS
const dotenv = require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})

const Carrier = require('../models/carrier/carrier')

var carrier = {
  "google":"@msg.fi.google.com",
  "verizon":"@vtext.com",
  "att":"@txt.att.net",
  "tmobile":"@tmomail.net",
  "verizon":"@vtext.com",
  "virgin":"@vmobl.com",
  "tracfone":"@mmst5.tracfone.com",
  "metropcs":"@mymetropcs.com",
  "boost":"@sms.myboostmobile.com",
  "cricket":"@sms.cricketwireless.net",
  "uscellular":"@email.uscc.net",
  "consumercellular":"@mailmymobile.net",
  "ting":"@message.ting.com",
  "cspire":"@cspire1.com",
  "pageplus":"@vtext.com",
  "republicwireless":"@text.republicwireless.com",
  "sprint":"@messaging.sprintpcs.com"
}

for(var key in carrier) {
  if (carrier.hasOwnProperty(key)) {
    Carrier.create({
      carrierName: key,
      gateway: carrier[key]
    },
    function (err, carrier) {
      if (err) {
        console.error("Error on data insert into Carrier table", err)
      } else {
        console.log("Successfully added ", carrier.get('carrierName'))
      }
    })
  }
}
