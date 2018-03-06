/**
 * models/user/user.js
 *
 * Enter phone number as 5553451212
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '2035551212'
    },
    carrier: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    tracking: {
      type: Sequelize.STRING,
      // type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
      // defaultValue: ['E1, E2']
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
