const { Router } = require('express');
const Food = require('../models/Food');

const router = Router();

router
  .get('/', async (req, res) => {
    const foods = await Food.getAll();
    res.json(foods);
  })
  .get('/:id', async (req, res, next) => {
    const id = await Food.getById(req.params.id);
    if (!id) {
      next();
    } else res.json(id);
  })
  .post('/', async (req, res) => {
    const newFood = await Food.insert(req.body);
    res.json(newFood);
  })
  .put('/:id', async (req, res) => {
    const data = await Food.updateById(req.params.id, req.body);
    res.json(data);
  });

module.exports = router;
