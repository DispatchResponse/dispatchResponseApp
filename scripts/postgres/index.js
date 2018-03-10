
const apparatus = require('./gfd_insert_apparatus.js')
const calls = require('./gfd_insert_calls.js')
const carriers = require('./gfd_insert_carriers.js')
const stations = require('./gfd_insert_stations.js')
const users = require('./gfd_insert_users.js')
const tracking = require('./gfd_insert_trackings.js')


const runAllInserts = async () => {
  await apparatus()
  await users()
  await calls()
  await carriers()
  await stations()
  await tracking()
  console.log('Complete')
}

runAllInserts()
