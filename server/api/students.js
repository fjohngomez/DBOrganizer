const router = require('express').Router();
const { models: { Student, Campus }} = require('../db')
module.exports = router;

router.get('/', async(req, res, next) => {
  try {
    const students = await Student.findAll({
      include: [Campus]
    });
    res.status(200).send(students)
  } catch (err) { next(err)}
})

router.get('/:id', async(req, res, next) => {
  try {
    const id = req.params.id
    const data = await Student.findOne({
      include: Campus,
      where: {
        id: id
      }
    });
    res.status(200).send(data)
   } catch (err) { next(err) }
})

router.post('/', async(req, res, next) => {
  try {
    const studentData = req.body;
    const newStudent = await Student.create(studentData);
    res.status(201).send(newStudent);
  } catch (err) { next (err) }
})

router.delete('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    await student.destroy();
    res.status(200).send(student)
  } catch (e) {
    next(e)
  }
})
