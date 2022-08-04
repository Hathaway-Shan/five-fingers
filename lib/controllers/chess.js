const { Router } = require('express');
const Piece = require('../models/Chess');

const router = Router();

router
  .get('/', async (req, res) => {
    const pieces = await Piece.getAll();
    res.json(pieces);
  })
  .get('/:id', async (req, res) => {
    const id = await Piece.getById(req.params.id);
    res.json(id);
  });

module.exports = router;
