const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  breed;

  constructor(row) {
    this.id = row.id;
    this.piece = row.piece;
    this.points = row.points;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from dogs');
    return rows.map((row) => new Dog(row));
  }
};
