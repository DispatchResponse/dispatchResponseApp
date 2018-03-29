/**
 * routes/util/processCallData.js
 *
 * This version uses SES sendRawEmail
 */

const emailTransporter = require('../../util/sendEmailSES')

/**
 * Send processed data to SMS-via-email
 */
const sendEmail = (data, recipient) => {
// Create sendEmail params
  recipient = ['2035160005@msg.fi.google.com']
  var rawMailBody = 'From: GFD <no-reply@dispatchresponse.com>\n'
  rawMailBody = rawMailBody + `To: ${recipient}\n`
  rawMailBody = rawMailBody + 'Subject: Test Subject\n'
  rawMailBody = rawMailBody + 'MIME-Version: 1.0\n'
  rawMailBody = rawMailBody + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n'
  rawMailBody = rawMailBody + '--NextPart\n'
  rawMailBody = rawMailBody + 'Content-type: text/plain; charset=iso-8859-1\n'
  rawMailBody = rawMailBody + 'Content-Transfer-Encoding: quoted-printable\n'
  rawMailBody = rawMailBody + 'Sample Text content\n'
  rawMailBody = rawMailBody + '--NextPart\n'
  rawMailBody = rawMailBody + 'Content-type: text/html; charset=iso-8859-1\n'
  rawMailBody = rawMailBody + 'Content-Transfer-Encoding: quoted-printable\n'
  rawMailBody = rawMailBody + `
<html>
<head>
</head>
<body>
<div style=3D"FONT-SIZE: 10pt; FONT-FAMILY: Arial">Sample HTML =
Content</div>
</body>
</html>
  `
  rawMailBody = rawMailBody + '\n--NextPart\n'

  var params = {
    // Destinations: [ recipient.address.trim() ],
    Destinations: recipient,
    FromArn: 'arn:aws:ses:us-east-1:830432741239:identity/dispatchresponse.com',
    ReturnPathArn: 'arn:aws:ses:us-east-1:830432741239:identity/dispatchresponse.com',
    Source: 'GFD <no-reply@dispatchresponse.com>',
    RawMessage: {
      Data: rawMailBody
    }

    // Message: {
    //   Body: {
    //     Html: {
    //       Charset: 'UTF-8',
    //       Data: `<p>Details: https://gfd.gr/${data.slug}/${recipient.userId}</p>
    //       <p>Call type: ${data.call_category}</p>
    //       <p>Location: ${data.location}  ${data.city}</p>
    //       <p>Assignment: ${data.assignment}</p>`
    //     },
    //     Text: {
    //       Charset: 'UTF-8',
    //       Data: `Details: https://gfd.gr/${data.slug}/${recipient.userId}
// Call type: ${data.call_category}
// Location: ${data.location}  ${data.city}
// Assignment: ${data.assignment}`
    //     }
    //   },
    //   Subject: {
    //     Charset: 'UTF-8',
    //     Data: 'GFD Call'
    //   },
    // },  // end Message

    // SourceArn: 'arn:aws:ses:us-east-1:830432741239:identity/dispatchresponse.com',
    // Source: 'GFD <no-reply@dispatchresponse.com>',
    // ReturnPath: 'GFD <kevin@dispatchresponse.com>',
    // ReturnPathArn: 'arn:aws:ses:us-east-1:830432741239:identity/dispatchresponse.com',
    // ReplyToAddresses: [ 'GFD <no-reply@dispatchresponse.com>' ]
  }

  // Send the email
  // emailTransporter.sendEmail(params).promise().then(
  emailTransporter.sendRawEmail(params).promise().then(
    function (data) {
      console.log(`Email sent successfully to ${recipient.address} with msgId of ${data.MessageId}`)
    }).catch(
    function (err) {
      console.error(`ERROR: Email not sent to ${recipient.address} --> ${err} ${err.stack}`)
    })
}

module.exports = sendEmail
