/**
 * scripts/postgres/gfd_insert_new_users.js
 */

const db = require('../../models')

var users = [
  {
    'firstName': 'Ted',
    'lastName': 'Ruehl',
    'mobile': '8452227015',
    'carrier': '@messaging.sprintpcs.com',
    'is_admin': false,
    'is_enabled': true,
    'is_sleeping': false,
    'created_at': '2018-03-22',
    'updated_at': '2018-03-22'
  }
]

const insertUser = (user) => {
  user.forEach(person => {
    db.users.create({
      first_name: person.firstName,
      last_name: person.lastName,
      mobile: person.mobile,
      carrier: person.carrier,
      is_admin: person.is_admin,
      is_enabled: person.is_enabled,
      is_sleeping: person.is_sleeping,
      created_at: person.created_at,
      updated_at: person.updated_at
    })
      .then(elem => console.log('Success on insert: ', elem))
      .catch(error => console.error('Error on data insert into Users table', error))
  })
}

const insertNewUsers = async () => {
  insertUser(users)
}

insertNewUsers()
