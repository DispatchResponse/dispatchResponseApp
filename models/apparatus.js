/**
 * models/apparatus.js
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('apparatus', {
    apparatusId: {
      // E5
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    apparatusName: {
      // Engine 5
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })
}
