//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
// const Student = require('./models/Student');
// const Campus = require('./models/Campus')

//associations could go here!
// Student.belongsTo(Campus);
// Campus.hasMany(Student);

// Campus.beforeCreate(campus => {
//   if(campus.imageURL.length < 1){
//     campus.imageURL = 'https://www.zenconomics.com/wp-content/uploads/2015/01/Public_School-400x300.jpg'
//   }
// })

module.exports = {
  db,
  models: {
    User,
    // Student,
    // Campus
  },
}
