// sync.js
const sequelize = require('./config/config')
const Alumni = require('./models/alumni')

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database connected and synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = syncDatabase
