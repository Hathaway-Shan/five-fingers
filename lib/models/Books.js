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
};
