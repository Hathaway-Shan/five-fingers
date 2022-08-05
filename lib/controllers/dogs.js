const { Router } = require('express');
const Dog = require('../models/Dogs');

const router = Router();

router
  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
  })
  .get('/:id', async (req, res, next) => {
    const id = await Dog.getById(req.params.id);
    if (!id) {
      next();
    } else res.json(id);
  })
  .post('/', async (req, res) => {
    const newDog = await Dog.insert(req.body);
    res.json(newDog);
  })
  .put('/:id', async (req, res) => {
    const data = await Dog.updateById(req.params.id, req.body);
    res.json(data);
  })
  .delete('/:id', async (req, res) => {
    const data = await Dog.deleteById(req.params.id);
    res.json(data);
  });

module.exports = router;
