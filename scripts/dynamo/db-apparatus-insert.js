/**
 * scripts/db-apparatus-insert.js
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

const Apparatus = require('../models/apparatus/apparatus')

var apparatus = {
  "DC":"Deputy Chief",
  "E1":"Engine 1",
  "E2":"Engine 2",
  "E3":"Engine 3",
  "E4":"Engine 4",
  "E5":"Engine 5",
  "E8":"Engine 8",
  "T1":"Tower 1",
  "E31":"Engine 31",
  "E41":"Engine 41",
  "E62":"Engine 62",
  "E71":"Engine 71",
  "TK2":"Tanker 2",
  "TK6":"Tanker 6",
  "TK7":"Tanker 7",
  "U2":"Utility 2",
  "U4":"Utility 4",
  "L4":"Ladder 4",
  "L5":"Ladder 5",
  "P2":"Patrol 2"
}

for(var key in apparatus) {
  if (apparatus.hasOwnProperty(key)) {
    Apparatus.create({
      apparatusId: key,
      apparatusName: apparatus[key],
      enabled: true
    },
    function (err, apparatus) {
      if (err) {
        console.error("Error on data insert into Apparatus table", err)
      } else {
        console.log("Successfully added ", apparatus.get('apparatusId'))
      }
    })
  }
}
