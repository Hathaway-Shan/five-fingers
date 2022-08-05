const { Router } = require('express');
const Card = require('../models/Cards');

const router = Router();

router
  .get('/', async (req, res) => {
    const cards = await Card.getAll();
    res.json(cards);
  })
  .get('/:id', async (req, res, next) => {
    const id = await Card.getById(req.params.id);
    if (!id) {
      next();
    } else res.json(id);
  })
  .post('/', async (req, res) => {
    const newCard = await Card.insert(req.body);
    res.json(newCard);
  })
  .put('/:id', async (req, res) => {
    const data = await Card.updateById(req.params.id, req.body);
    res.json(data);
  });

module.exports = router;
