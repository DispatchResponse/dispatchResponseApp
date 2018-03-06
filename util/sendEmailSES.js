/**
 * util/sendEmailSES.js
 *
 */

let nodemailer = require('nodemailer');
let AWS = require('aws-sdk');

const AKID = process.env.AWS_ACCESS_KEY_ID
const SECRET = process.env.AWS_SECRET_ACCESS_KEY
const REGION = process.env.AWS_REGION

AWS.config.update({accessKeyId: AKID, secretAccessKey: SECRET, region: REGION})

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01'
    })
});

// // send some mail
// transporter.sendMail({
//     from: 'kevin@rustybear.com',
//     to: 'rustybear@gmail.com',
//     subject: 'Message from SES and nodemailer',
//     text: 'I hope this message gets sent!',
// }, (err, info) => {
//     if (err) {
//         console.error(err)
//     } else {
//         console.log(info.envelope);
//         console.log(info.messageId);
//     }
// });

module.exports = transporter

