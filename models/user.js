/**
 * models/user/user.js
 *
 * Enter phone number as 5553451212
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    last_name: {
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
      underscored: true,
      getterMethods: {
        full_name: function() {return this.first_name + ' ' + this.last_name},
        full_mobile: function () {return this.getDataValue('mobile') + this.getDataValue('carrier')}
      }
    }
 )
}
