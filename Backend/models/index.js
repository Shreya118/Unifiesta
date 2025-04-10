const sequelize = require('../config/database');
const User = require('./user');
const Event = require('./event');
const Registration = require('./registration');

// Define associations
User.hasMany(Event, { foreignKey: 'created_by' });
Event.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Registration, { foreignKey: 'user_id' });
Event.hasMany(Registration, { foreignKey: 'event_id' });
Registration.belongsTo(User, { foreignKey: 'user_id' });
Registration.belongsTo(Event, { foreignKey: 'event_id' });

// Sync without forcing table drops
sequelize.sync({ alter: true }) // Use alter to update schema without dropping data
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = { sequelize, User, Event, Registration };