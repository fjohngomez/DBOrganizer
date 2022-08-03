'use strict'
const { faker } = require('@faker-js/faker');

const {db, models: {User, Campus, Student} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const fakeStudent = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}.${lastName}@campus.edu`
  const imageURL = faker.image.avatar();
  const gpa = (Math.random()*(2)+ 2).toFixed(1)

  return {
    firstName,
    lastName,
    email,
    imageURL,
    gpa
  }
}

const testStudents = () => {
  let count = 0;
  const arr = [];
  while(count < 200){
    let student = fakeStudent();
    arr.push(student);
    count += 1;
  }
  return arr;
}

const studentTestData = testStudents()

const campusTestData = [
  {
    name: 'City College',
    address: '123 convent ave',
    description: 'a school I went to'
  },
  {
    name: 'York College',
    address: '123 york ave',
    description: 'Some School around'
  },
  {
    name: 'Hostos Community College',
    address: 'grand concourse ave',
    description: 'a bronx community college'
  }
]

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')


  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  const campuses = await Promise.all(campusTestData.map(campus => Campus.create(campus)))
  const students = await Promise.all(studentTestData.map(student => Student.create(student)))

  await Promise.all(students.map(async (s, i) => {
    const studentPk = i + 1;
    const maxCampus = campuses.length
    const randomCampus = Math.floor(Math.random() * (maxCampus) + 1)
    const studentData = await Student.findByPk(studentPk);
    await studentData.setCampus(randomCampus)
  }))

  // const student1 = await Student.findByPk(1)
  // await student1.setCampus(1)
  console.log(`seeded ${students.length} students & ${campuses.length} campuses`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
