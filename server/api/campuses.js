const router = require('express').Router();
const { models: { Student, Campus }} = require('../db');
module.exports = router;

router.get('/', async(req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      include: [Student]
    });
    res.status(200).send(campuses);
  } catch (err) { next(err) }
})

router.get('/:id', async(req, res, next) => {
  try {
    const id = req.params.id
    const data = await Campus.findOne({
      include: Student,
      where: {
        id: id
      }
    });
    res.status(200).send(data);
  } catch (err) { next(err) }
})

//post new campus
router.post('/', async(req, res, next) => {
  try {
    const newCampusData = req.body;
    const newCampus = await Campus.create(newCampusData);
    res.status(201).send(newCampus);
  } catch (err) { next(err) }
})

router.delete('/:id', async(req, res, next) => {
  try {
    const id = req.params.id;
    const campus = await Campus.findByPk(id);
    await campus.destroy();
    res.status(200).send(campus)
  } catch (e) {
    next(e)
  }
})
