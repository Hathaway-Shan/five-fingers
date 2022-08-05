const { Router } = require('express');
const Book = require('../models/Books');

const router = Router();

router
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res, next) => {
    const id = await Book.getById(req.params.id);
    if (!id) {
      next();
    } else res.json(id);
  })
  .post('/', async (req, res) => {
    const newBook = await Book.insert(req.body);
    res.json(newBook);
  })
  .put('/:id', async (req, res) => {
    const data = await Book.updateById(req.params.id, req.body);
    res.json(data);
  })
  .delete('/:id', async (req, res) => {
    const data = await Book.deleteById(req.params.id);
    res.json(data);
  });

module.exports = router;
