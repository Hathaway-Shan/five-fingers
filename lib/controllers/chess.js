const { Router } = require('express');
const Piece = require('../models/Chess');

const router = Router();

router
  .get('/', async (req, res, next) => {
    try {
      const pieces = await Piece.getAll();
      res.json(pieces);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = await Piece.getById(req.params.id);
      if (!id) {
        next();
      } else res.json(id);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newPiece = await Piece.insert(req.body);
      res.json(newPiece);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Piece.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Piece.deleteById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
