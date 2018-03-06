/**
 * scripts/postgres/gfd_insert_stations.js
 */

const db = require('../../models')

var stations = {
  "STA1":"Station 1",
  "STA2":"Station 2",
  "STA3":"Station 3",
  "STA4":"Station 4",
  "STA5":"Station 5",
  "STA6":"Station 6",
  "STA7":"Station 7",
  "STA8":"Station 8"
}

const insertStations = (station) => {
  for(var key in station) {
    if (station.hasOwnProperty(key)) {
      db.stations.upsert({
        stationId: key,
        stationName: stations[key],
        enabled: true
      })
      .then(elem => console.log('Success on insert: ', elem))
      .catch(error => console.error("Error on data insert into Station table", error))
    }
  }
}

insertStations(stations)
