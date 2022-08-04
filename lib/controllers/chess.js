const { Router } = require('express');
const Piece = require('../models/Chess');

const router = Router();

router.get('/', async (req, res) => {
  const pieces = await Piece.getAll();
  res.json(pieces);
});

module.exports = router;
