const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Event = require('./event');

const Registration = sequelize.define('Registration', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  event_id: { type: DataTypes.INTEGER, references: { model: Event, key: 'id' } },
  registration_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Registration;