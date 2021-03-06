/**
 * scripts/postgres/gfd_insert_users.js
 */

const db = require('../../models')

var users = [{
  'firstName': 'Kevin',
  'lastName': 'Coyner',
  'mobile': '2035160005',
  'tracking': "['E3','E1']",
  'carrier': '@msg.fi.google.com',
  'is_admin': true,
},
{
  'firstName': 'Nick',
  'lastName': 'Freeman',
  'mobile': '8057060651',
  'tracking': "['E8','E2']",
  'carrier': '@vtext.com',
  'is_admin': true,
}
]

const destroyAllUsers = () => {
  db.users.destroy({
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

const insertUser = (user) => {
  user.forEach(person => {
    db.users.create({
      first_name: person.firstName,
      last_name: person.lastName,
      mobile: person.mobile,
      carrier: person.carrier,
      tracking: person.tracking,
      is_admin: person.is_admin,
      enabled: true
    })
      .then(elem => console.log('Success on insert: ', elem))
      .catch(error => console.error('Error on data insert into Users table', error))
  })
}

const destroyAndInsert = async () => {
  await destroyAllUsers()
  insertUser(users)
}

module.exports = destroyAndInsert
