const { Router } = require('express');
const Card = require('../models/Cards');

const router = Router();

router.get('/', async (req, res) => {
  const cards = await Card.getAll();
  res.json(cards);
});

module.exports = router;
