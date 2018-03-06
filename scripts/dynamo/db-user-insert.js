/**
 * scripts/db-user-insert.js
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

const User = require('../models/user/user')

var user = [
  {"firstName":"Kevin", "lastName":"Coyner", "mobile":"2035160005", "tracking":['E4', 'E1']},
  {"firstName":"Nick", "lastName":"Freeman", "mobile":"8057060651", "tracking":['E5', 'E2']}
]

user.forEach(person => {
  User.create({
    firstName: person.firstName,
    lastName:  person.lastName,
    mobile:  person.mobile,
    tracking:  person.tracking,
    enabled: true
  },
  function(err, data) {
      if (err) {
        console.error("Error on data insert into User table", err)
      } else {
        console.log(`Successfully added ${data.get("firstName")} ${data.get("lastName")} at ${data.get("mobile")} assigned to ${data.get("tracking")}`)
      }
  })
})
