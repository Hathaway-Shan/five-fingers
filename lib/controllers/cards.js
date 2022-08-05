const { Router } = require('express');
const Card = require('../models/Cards');

const router = Router();

router
  .get('/', async (req, res) => {
    const cards = await Card.getAll();
    res.json(cards);
  })
  .get('/:id', async (req, res) => {
    const id = await Card.getById(req.params.id);
    res.json(id);
  })
  .post('/', async (req, res) => {
    const newCard = await Card.insert(req.body);
    res.json(newCard);
  });

module.exports = router;
