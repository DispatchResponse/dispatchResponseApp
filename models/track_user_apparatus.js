/**
 * models/track_user_apparatus.js
 *
 * Join table between users and apparatus
 *
 * Sequelize will automatically create this table with foreign keys linked to
 * apparatus.apparatus_id and users.user_id. This is achieved via the
 * belongsToMany commands in the models/index.js file.
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'track_user_apparatus',
    {
      ua_id: {
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
