const { Router } = require('express');
const Book = require('../models/Books');

const router = Router();

router
  .get('/', async (req, res, next) => {
    try {
      const books = await Book.getAll();
      res.json(books);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = await Book.getById(req.params.id);
      if (!id) {
        next();
      } else res.json(id);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newBook = await Book.insert(req.body);
      res.json(newBook);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Book.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Book.deleteById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
