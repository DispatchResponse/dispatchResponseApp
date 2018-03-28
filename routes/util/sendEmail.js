/**
 * routes/util/processCallData.js
 */

const emailTransporter = require('../../util/sendEmailSES')

/**
 * Send processed data to SMS-via-email
 */
const sendEmail = (data, recipient) => {
// Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: [ recipient.address.trim() ]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<p>Details: https://gfd.gr/${data.slug}/${recipient.userId}</p>
          <p>Call type: ${data.call_category}</p>
          <p>Location: ${data.location}  ${data.city}</p>
          <p>Assignment: ${data.assignment}</p>`
        },
        Text: {
          Charset: 'UTF-8',
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
      'no-reply@dispatchresponse.com'
    ]
  }
  // Send the email
  emailTransporter.sendEmail(params).promise().then(
    function (data) {
      console.log(`Email sent successfully to ${recipient.address} with msgId of ${data.MessageId}`)
    }).catch(
    function (err) {
      console.error(`ERROR: Email not sent to ${recipient.address} --> ${err} ${err.stack}`)
    })
}

module.exports = sendEmail
