const pool = require('../utils/pool');

module.exports = class Card {
  id;
  name;
  cmc;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cmc = row.cmc;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from magic_cards');
    return rows.map((row) => new Card(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'select * from magic_cards where id = $1;',
      [id]
    );
    if (!rows[0]) return null;
    return new Card(rows[0]);
  }
  static async insert({ name, cmc }) {
    const { rows } = await pool.query(
      'insert into magic_cards (name, cmc) values ($1, $2) returning *;',
      [name, cmc]
    );
    return new Card(rows[0]);
  }
  static async updateById(id, update) {
    const oldCard = await Card.getById(id);
    const newCard = {
      ...oldCard,
      ...update,
    };
    const { rows } = await pool.query(
      `update magic_cards
      set name = $1, cmc = $2
      where id = $3
      returning *`,
      [newCard.name, newCard.cmc, id]
    );
    return new Card(rows[0]);
  }
};
