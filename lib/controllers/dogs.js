const { Router } = require('express');
const Dog = require('../models/Dogs');

const router = Router();

router
  .get('/', async (req, res, next) => {
    try {
      const dogs = await Dog.getAll();
      res.json(dogs);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = await Dog.getById(req.params.id);
      if (!id) {
        next();
      } else res.json(id);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newDog = await Dog.insert(req.body);
      res.json(newDog);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Dog.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Dog.deleteById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
