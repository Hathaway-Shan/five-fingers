const { Router } = require('express');
const Dog = require('../models/Dogs');

const router = Router();

router
  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
  })
  .get('/:id', async (req, res) => {
    const id = await Dog.getById(req.params.id);
    res.json(id);
  })
  .post('/', async (req, res) => {
    const newDog = await Dog.insert(req.body);
    res.json(newDog);
  });

module.exports = router;
