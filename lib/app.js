const express = require('express');
const path = require('path');

const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// App routes get all
app.use('/more_books', require('./controllers/books'));
app.use('/magic_cards', require('./controllers/cards'));
app.use('/chess_pieces', require('./controllers/chess'));
app.use('/food', require('./controllers/food'));
app.use('/dogs', require('./controllers/dogs'));
//app routes get by id
app.use('/more_books/:id', require('./controllers/books'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
