const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.zenconomics.com/wp-content/uploads/2015/01/Public_School-400x300.jpg'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notNull: true,
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})
