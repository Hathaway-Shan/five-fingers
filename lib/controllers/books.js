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
  .post('/more_books', async (req, res) => {
    console.log('======>', req.body);
    const newBook = await Book.insert(req.body);
    console.log('======>', newBook.body);
    res.json(newBook);
    console.log('======>', newBook.body);
  });

module.exports = router;
