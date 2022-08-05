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
    if (rows.length === 0) {
      return null;
    }
    if (!rows[0]) return null;
    return new Piece(rows[0]);
  }
  static async insert({ piece, points }) {
    const { rows } = await pool.query(
      'insert into chess_pieces (piece, points) values ($1, $2) returning *;',
      [piece, points]
    );
    return new Piece(rows[0]);
  }
  static async updateById(id, update) {
    const oldPiece = await Piece.getById(id);
    const newPiece = {
      ...oldPiece,
      ...update,
    };
    const { rows } = await pool.query(
      `update chess_pieces
      set piece = $1, points = $2
      where id = $3
      returning *`,
      [newPiece.piece, newPiece.points, id]
    );
    return new Piece(rows[0]);
  }
};
