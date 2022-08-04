const { Router } = require('express');
const Dog = require('../models/Dogs');

const router = Router();

router.get('/', async (req, res) => {
  const dogs = await Dog.getAll();
  res.json(dogs);
});

module.exports = router;
