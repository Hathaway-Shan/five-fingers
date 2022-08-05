const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from more_books');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'select * from more_books where id = $1;',
      [id]
    );
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }
  static async insert({ title, author }) {
    const { rows } = await pool.query(
      'insert into more_books (title, author) values ($1, $2) returning *;',
      [title, author]
    );
    return new Book(rows[0]);
  }
  static async updateById(id, update) {
    const oldBook = await Book.getById(id);
    const newBook = {
      ...oldBook,
      ...update,
    };
    const { rows } = await pool.query(
      `update more_books
      set title = $1, author = $2
      where id = $3
      returning *`,
      [newBook.title, newBook.author, id]
    );
    return new Book(rows[0]);
  }
  static async;
};
