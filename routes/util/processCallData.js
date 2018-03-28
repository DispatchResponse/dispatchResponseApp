/**
 * routes/util/processCallData.js
 */
const cuid = require('cuid')

/**
 * Prepare and parse data before DB injection and emailing
 *
 * TODO: parse logic to deal with cases of no apparatus assignment but radio
 * freq is listed and other cases during busy times
 * TODO: is UnitList always comma separated?  sometimes i think not yet we
 * assume it is. can we deal with it if it is space separated? yes, but what if
 * it is comma separated between radioFreq and engines but within the engines
 * it is space separated?  much more difficult.
 */
const processData = (data) => {
  let slug = cuid.slug()
  let assignment = data.UnitList.split(',').splice(1).join(' ').trim()
  let radioFreq = data.UnitList.split(',')[0]
  let aptNo = data.apt_no || ''
  let callCategory = data.call_category || ''
  let callDescription = data.call_description || ''
  let callType = data.call_type || ''
  let crossStreet = data.x_street_name.split(' ').splice(3).join(' ') || ''
  let mapRef = data.x_street_name.split(' ').splice(0, 3).join(' ') || ''
  let cfsNo = Number.parseInt(data.cfs_no) || ''
  let cfsRemark = data.cfs_remark || ''
  let city = data.city || ''
  let dispatchFire = data.dispatch_fire || ''
  let longitude = data.longitude || ''
  let latitude = data.latitude || ''
  let location = data.location || ''
  let premise = data.premise_name || ''
  let priorityAmb = data.priority_amb || ''
  let priorityFire = data.priority_fire || ''
  let priorityPol = data.priority_pol || ''
  let timeout = data.rec_dt || ''
  let zip = data.zip || ''
  let testCall = data.test_call || false

  let callDetails = {
    assignment: assignment,
    radio_freq: radioFreq,
    apt_no: aptNo,
    call_category: callCategory,
    call_description: callDescription,
    call_type: callType,
    cfs_no: cfsNo,
    cfs_remark: cfsRemark,
    city: city,
    dispatch_fire: dispatchFire,
    latitude: latitude,
    location: location,
    longitude: longitude,
    premise_name: premise,
    priority_amb: priorityAmb,
    priority_fire: priorityFire,
    priority_pol: priorityPol,
    timeout: timeout,
    cross_street: crossStreet,
    map_ref: mapRef,
    test_call: testCall,
    zip: zip,
    slug: slug
  }
  return callDetails
}

module.exports = processData
