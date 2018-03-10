/**
 * models/apparatus.js
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'apparatus',
    {
      apparatus_id: {
        // E5
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      apparatus_name: {
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  )
}
