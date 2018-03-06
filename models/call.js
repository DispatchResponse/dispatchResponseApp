/**
 * models/call.js
 *
 */
'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('calls', {
    callId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    assignment: {
      // UnitList - also contains radio channel as first item
      // CH1A, E5, E2
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    radio_freq: {
      // UnitList - also contains assigned engines as remaining items
      // CH1A, E5, E2
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    apt_no: {
      // apt_no
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    call_category: {
      // call_category
      // STILL ALARM
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    call_description: {
      // call_description
      // STILL ALARM
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    call_type: {
      // call_type
      // 801
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    cfs_no: {
      // cfs_no  -- not used in this app
      // 1800001672
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    cfs_remark: {
      // cfs_remark
      // WATER CONDITION IN THE HOME - BROKEN WATER PIPE
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    city: {
      // city
      // Cos Cob
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    dispatch_fire: {
      // dispatch_fire -- not used in this app
      // 1900-01-01T00:00:00
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    latitude: {
      // latitude
      // 41.0401\r
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    location: {
      // location
      // 00084  RIVER RD
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    longitude: {
      // longitude
      // -73.50401\r
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    premise_name: {
      // premise_name -- not always supplied from Dispatch
      // 84 RIVER RD
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    priority_amb: {
      // priority_amb
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    priority_fire: {
      // priority_fire
      // FD Pri:1
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    priority_pol: {
      // priority_pol
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    timeout: {
      // rec_dt
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    cross_street: {
      // x_street_name -- contains map reference and cross streets
      //  Map -M20 NEWMAN ST&RIVER LN
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    map_ref: {
      // x_street_name -- contains map reference and cross streets
      //  Map -M20 NEWMAN ST&RIVER LN
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    },
    zip: {
      // zip
      // 06830
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
      // validate: {
      //   min: 0,
      //   max: 10
      // }
    },
    slug: {
      // slug -- 8 char alphanumeric from module cuid
      //  py2f7hq7
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'py2f7hq7'
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
