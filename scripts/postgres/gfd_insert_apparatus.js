/**
 * scripts/postgres/gfd_insert_apparatus.js
 */

const db = require('../../models')

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
  "P2":"Patrol 21"
}

const insertApparatus = (apparatus) => {
  for(var key in apparatus) {
    if (apparatus.hasOwnProperty(key)) {
      db.apparatus.upsert({
        apparatusId: key,
        apparatusName: apparatus[key],
        enabled: true
      })
      .then(app => console.log('Success on insert: ', app))
      .catch(error => console.error(error))
    }
  }
}

insertApparatus(apparatus)
