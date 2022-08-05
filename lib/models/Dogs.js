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
  static async insert({ name, breed }) {
    const { rows } = await pool.query(
      'insert into dogs (name, breed) values ($1, $2) returning *;',
      [name, breed]
    );
    return new Dog(rows[0]);
  }
  static async updateById(id, update) {
    const oldDog = await Dog.getById(id);
    const newDog = {
      ...oldDog,
      ...update,
    };
    const { rows } = await pool.query(
      `update dogs
      set name = $1, breed = $2
      where id = $3
      returning *`,
      [newDog.name, newDog.breed, id]
    );
    return new Dog(rows[0]);
  }
};
