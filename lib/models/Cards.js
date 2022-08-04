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
};
