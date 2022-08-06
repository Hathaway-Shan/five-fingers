const { Router } = require('express');
const Card = require('../models/Cards');

const router = Router();

router
  .get('/', async (req, res, next) => {
    try {
      const cards = await Card.getAll();
      res.json(cards);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = await Card.getById(req.params.id);
      if (!id) {
        next();
      } else res.json(id);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newCard = await Card.insert(req.body);
      res.json(newCard);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Card.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Card.deleteById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
