const { Router } = require('express');
const Book = require('../models/Books');

const router = Router();

router
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const id = await Book.getById(req.params.id);
    res.json(id);
  })
  .post('/', async (req, res) => {
    const newBook = await Book.insert(req.body);
    res.json(newBook);
  });

module.exports = router;
