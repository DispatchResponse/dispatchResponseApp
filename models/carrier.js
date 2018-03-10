/**
 * models/carrier.js
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'carriers',
    {
      carrier_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      carrier_name: {
        // verizon
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null
      },
      gateway: {
        // @vtext.com
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
