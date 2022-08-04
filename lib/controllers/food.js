const { Router } = require('express');
const Food = require('../models/Food');

const router = Router();

router.get('/', async (req, res) => {
  const foods = await Food.getAll();
  res.json(foods);
});

module.exports = router;
