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
};
