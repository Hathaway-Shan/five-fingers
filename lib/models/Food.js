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
  static async getById(id) {
    const { rows } = await pool.query('select * from food where id = $1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Food(rows[0]);
  }
  static async insert({ name, cuisine }) {
    const { rows } = await pool.query(
      'insert into food (name, cuisine) values ($1, $2) returning *;',
      [name, cuisine]
    );
    return new Food(rows[0]);
  }
};
