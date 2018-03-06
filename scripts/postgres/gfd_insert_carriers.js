/**
 * scripts/postgres/gfd_insert_carriers.js
 */

const db = require('../../models')

var carriers = {
  "google":"@msg.fi.google.com",
  "verizon":"@vtext.com",
  "att":"@txt.att.net",
  "tmobile":"@tmomail.net",
  "verizon":"@vtext.com",
  "virgin":"@vmobl.com",
  "tracfone":"@mmst5.tracfone.com",
  "metropcs":"@mymetropcs.com",
  "boost":"@sms.myboostmobile.com",
  "cricket":"@sms.cricketwireless.net",
  "uscellular":"@email.uscc.net",
  "consumercellular":"@mailmymobile.net",
  "ting":"@message.ting.com",
  "cspire":"@cspire1.com",
  "pageplus":"@vtext.com",
  "republicwireless":"@text.republicwireless.com",
  "sprint":"@messaging.sprintpcs.com"
}

const insertCarrier = (carrier) => {
  for(var key in carrier) {
    if (carrier.hasOwnProperty(key)) {
      db.carriers.upsert({
        carrierName: key,
        gateway: carrier[key],
        enabled: true
      })
      .then(elem => console.log('Success on insert: ', elem))
      .catch(error => console.error("Error on data insert into Carrier table", error))
    }
  }
}

insertCarrier(carriers)
