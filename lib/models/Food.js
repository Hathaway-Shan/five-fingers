const pool = require('../utils/pool');

module.exports = class Food {
  id;
  name;
  cuisine;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from food');
    return rows.map((row) => new Food(row));
  }
};
