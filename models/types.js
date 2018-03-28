/**
 * models/types.js
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'types',
    {
      type: {
        // active or volunteer
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        validate: { isIn: [['career', 'volunteer', 'combination']] },
        default: 'career'
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  )
}
