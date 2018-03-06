/**
 * models/carrier.js
 *
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('carriers', {
    carrierId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    carrierName: {
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


// const dynamo = require('dynamodb')
// const Joi = require('joi')
// const Carrier = dynamo.define('Carrier', {
//   hashKey: 'carrierName',
//   // add the timestamp attributes (updatedAt, createdAt)
//   timestamps: true,
//   schema: {
//     carrierId: dynamo.types.uuid(),
//     carrierName: Joi.string().optional().allow(''),
//     gateway: Joi.string().optional().allow(''),
//     enabled: Joi.boolean().default(true)
//   }
// })
// module.exports = Carrier
