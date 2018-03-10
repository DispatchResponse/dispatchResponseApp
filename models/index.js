/**
 *  models/index.js
 */

const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()

// Retrieve environment variables
const NODE_ENV = process.env.NODE_ENV
const DB_PG_PASSWD = process.env.DB_PG_PASSWD

// Initialize database settings
var db = {}
const DBNAME = 'gfddispatch'
const DBUSER = 'webapplogin'
var dbHost = 'dispatchresponse.cyqnwvgizc2j.us-east-1.rds.amazonaws.com'
var isDbConnSSL = false // for AWS use true, for localhost use false
if (NODE_ENV === 'production') {
  isDbConnSSL = true
}

const sequelize = new Sequelize(DBNAME, DBUSER, DB_PG_PASSWD, {
  host: dbHost,
  dialect: 'postgres',
  dialectOptions: { ssl: isDbConnSSL },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  define: {
    charset: 'utf8',
    timestamps: true,
    userscored: true
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./user')(sequelize, Sequelize)
db.calls = require('./call')(sequelize, Sequelize)
db.carriers = require('./carrier')(sequelize, Sequelize)
db.stations = require('./station')(sequelize, Sequelize)
db.apparatus = require('./apparatus')(sequelize, Sequelize)
db.trackings = require('./tracking')(sequelize, Sequelize)

// db.users.belongsToMany(db.apparatus, {through: db.trackings, foreignKey: 'user_id'})
// db.apparatus.belongsToMany(db.users, {through: db.trackings, foreignKey: 'apparatus_id'})

db.users.hasMany(db.trackings, { foreignKey: 'user_id' })
db.trackings.belongsTo(db.users, { foreignKey: 'user_id' })
db.apparatus.hasMany(db.trackings, { foreignKey: 'apparatus_id' })
db.trackings.belongsTo(db.apparatus, { foreignKey: 'apparatus_id' })

module.exports = db
