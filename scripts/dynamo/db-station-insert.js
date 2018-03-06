/**
 * scripts/db-station-insert.js
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

const Station = require('../models/station/station')

var station = {
  "STA1":"Station 1",
  "STA2":"Station 2",
  "STA3":"Station 3",
  "STA4":"Station 4",
  "STA5":"Station 5",
  "STA6":"Station 6",
  "STA7":"Station 7",
  "STA8":"Station 8",
}

for(var key in station) {
  if (station.hasOwnProperty(key)) {
    Station.create({
      stationId: key,
      stationName: station[key]
    },
    function (err, station) {
      if (err) {
        console.error("Error on data insert into Station table", err)
      } else {
        console.log("Successfully added ", station.get('stationId'))
      }
    })
  }
}
