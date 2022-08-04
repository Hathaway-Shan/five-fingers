const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  cuisine;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from dogs');
    return rows.map((row) => new Dog(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('select * from dogs where id = $1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Dog(rows[0]);
  }
};
