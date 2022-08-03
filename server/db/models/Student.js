const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notNull: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notNull: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notNull: true,
      isEmail: true
    }
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue: 'http://res.freestockphotos.biz/pictures/15/15994-a-female-student-reading-a-book-pv.jpg'
  },
  gpa: { //Revisit a better way to store GPA data; Maybe as a whole number and reflect on front end code ?
    type: Sequelize.DECIMAL,
    validate: {
      len: [1,5],
      min: 0.0,
      max: 4.0
    }
  }
})
