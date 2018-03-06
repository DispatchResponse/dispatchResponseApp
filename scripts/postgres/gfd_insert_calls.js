/**
 * scripts/postgres/gfd_insert_calls.js
 */

const db = require('../../models')

var calls = [
  {
    "assignment": "DC, E1, E2, E3, E4, R5, T1",
    "radio_freq": "CH1A",
    "apt_no": "",
    "call_category": "REPORTED STRUCTURE FIRE",
    "call_description": "REPORTED STRUCTURE FIRE",
    "call_type": "800",
    "cfs_no": "1800001052",
    "cfs_remark": "SMOKE IN STRUCTURE",
    "city": "BELLE HAVEN",
    "dispatch_fire": "2018-01-09T12:18:57.110",
    "latitude": "41.013021\r",
    "location": "00070 BUSH AV",
    "longitude": "-73.636978\r",
    "premise_name": "00070 BUSH AV",
    "priority_amb": "",
    "priority_fire": "FD Pri:1",
    "priority_pol": "",
    "timeout": "01-09-2018 12:17:31",
    "cross_street": "MEADOW WOOD DR&FIELD POINT RD",
    "map_ref": "-F22",
    "test_call": true,
    "zip": "",
    "slug": "f34h56af"
  }
]

const destroyAllCalls = () => {
  db.calls.destroy({
    cascade: true,
    restartIdentity: true,
    truncate: true
  }).then(rowDeleted => {
    if (rowDeleted >= 1) {
      console.log('Successfully deleted: ', rowDeleted)
    }
  }, error => {
    console.log(error)
  })
}

const insertCall = (calls) => {
  calls.forEach(call => {
    console.log('call: ', call);
    db.calls.create({
        assignment: call.assignment,
        radio_freq: call.radio_freq,
        apt_no: call.apt_no,
        call_category: call.call_category,
        call_description: call.call_description,
        call_type: call.call_type,
        cfs_no: call.cfs_no,
        cfs_remark: call.cfs_remark,
        city: call.city,
        dispatch_fire: call.dispatch_fire,
        latitude: call.latitude,
        location: call.location,
        longitude: call.longitude,
        premise_name: call.premise_name,
        priority_amb: call.priority_amb,
        priority_fire: call.priority_fire,
        priority_pol: call.priority_pol,
        timeout: call.timeout,
        cross_street: call.cross_street,
        map_ref: call.map_ref,
        test_call: call.test_call,
        zip: call.zip,
        slug: call.slug
      })
      .then(elem => console.log('Success on insert: ', elem))
      .catch(error => console.error("Error on data insert into Calls table", error))
  })
}

destroyAllCalls()
insertCall(calls)
