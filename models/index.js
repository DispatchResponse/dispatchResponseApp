/**
 *  models/index.js
 */

const Sequelize = require('sequelize')
const env = require('env2')('.env')

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
db.types = require('./types')(sequelize, Sequelize)
db.apparatus = require('./apparatus')(sequelize, Sequelize)
db.station_apparatus = require('./station_apparatus')(sequelize, Sequelize)
db.track_user_apparatus = require('./track_user_apparatus')(sequelize, Sequelize)
db.track_user_station = require('./track_user_station')(sequelize, Sequelize)

// db.users.belongsToMany(db.apparatus, {through: db.trackings, foreignKey: 'user_id'})
// db.apparatus.belongsToMany(db.users, {through: db.trackings, foreignKey: 'apparatus_id'})

db.users.hasMany(db.track_user_station, { foreignKey: 'user_id' })
db.track_user_station.belongsTo(db.users, { foreignKey: 'user_id' })
db.stations.hasMany(db.track_user_station, { foreignKey: 'station_id' })
db.track_user_station.belongsTo(db.stations, { foreignKey: 'station_id' })

db.users.hasMany(db.track_user_apparatus, { foreignKey: 'user_id' })
db.track_user_apparatus.belongsTo(db.users, { foreignKey: 'user_id' })
db.apparatus.hasMany(db.track_user_apparatus, { foreignKey: 'apparatus_id' })
db.track_user_apparatus.belongsTo(db.apparatus, { foreignKey: 'apparatus_id' })

db.stations.belongsTo(db.types, {foreignKey: 'station_type'})

db.stations.hasMany(db.station_apparatus, { foreignKey: 'station_id' })
db.station_apparatus.belongsTo(db.stations, { foreignKey: 'station_id' })
db.apparatus.hasMany(db.station_apparatus, { foreignKey: 'apparatus_id' })
db.station_apparatus.belongsTo(db.apparatus, { foreignKey: 'apparatus_id' })

module.exports = db
