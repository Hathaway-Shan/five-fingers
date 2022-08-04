const pool = require('../utils/pool');

module.exports = class Piece {
  id;
  piece;
  points;

  constructor(row) {
    this.id = row.id;
    this.piece = row.piece;
    this.points = row.points;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from chess_pieces');
    return rows.map((row) => new Piece(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'select * from chess_pieces where id = $1;',
      [id]
    );
    if (!rows[0]) return null;
    return new Piece(rows[0]);
  }
};
