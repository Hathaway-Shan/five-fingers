const { Router } = require('express');
const Food = require('../models/Food');

const router = Router();

router
  .get('/', async (req, res) => {
    const foods = await Food.getAll();
    res.json(foods);
  })
  .get('/:id', async (req, res) => {
    const id = await Food.getById(req.params.id);
    res.json(id);
  });

module.exports = router;
