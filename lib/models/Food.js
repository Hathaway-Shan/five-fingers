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
    if (rows.length === 0) {
      return null;
    }
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
  static async updateById(id, update) {
    const oldFood = await Food.getById(id);
    const newFood = {
      ...oldFood,
      ...update,
    };
    const { rows } = await pool.query(
      `update food
      set name = $1, cuisine = $2
      where id = $3
      returning *`,
      [newFood.name, newFood.cuisine, id]
    );
    return new Food(rows[0]);
  }
};
