/**
 * models/tracking.js
 *
 * Join table between users and apparatus
 *
 * Sequelize will automatically create this table with foreign keys linked to
 * apparatus.apparatusId and users.userId. This is achieved via the
 * belongsToMany commands in the models/index.js file.
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tracking', {
    trackingId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  })
}
