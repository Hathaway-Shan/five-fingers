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
  })
  .post('/', async (req, res) => {
    const newPiece = await Piece.insert(req.body);
    res.json(newPiece);
  })
  .put('/:id', async (req, res) => {
    const data = await Piece.updateById(req.params.id, req.body);
    res.json(data);
  });

module.exports = router;
