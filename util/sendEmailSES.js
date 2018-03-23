/**
 * util/sendEmailSES.js
 *
 */

let AWS = require('aws-sdk')

const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})

// Create the SES service object
var transporter = new AWS.SES({apiVersion: '2010-12-01'})

module.exports = transporter
