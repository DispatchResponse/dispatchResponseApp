/**
 * models/track_station_apparatus.js
 *
 * Join table between stations and apparatus
 *
 * Sequelize will automatically create this table with foreign keys linked to
 * apparatus.apparatus_id and stations.station_id. This is achieved via the
 * belongsToMany commands in the models/index.js file.
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'track_station_apparatus',
    {
      sa_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
}
