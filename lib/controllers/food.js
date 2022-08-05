const { Router } = require('express');
const Food = require('../models/Food');

const router = Router();

router
  .get('/', async (req, res, next) => {
    try {
      const foods = await Food.getAll();
      res.json(foods);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = await Food.getById(req.params.id);
      if (!id) {
        next();
      } else res.json(id);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newFood = await Food.insert(req.body);
      res.json(newFood);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Food.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Food.deleteById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
