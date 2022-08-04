const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#get chess_pieces returns a list of chess pieces', async () => {
    const res = await request(app).get('/chess_pieces');
    expect(res.body.length).toEqual(3);
  });
  it('#get chess_pieces by id returns first row', async () => {
    const res = await request(app).get('/chess_pieces/1');
    const firstEntity = {
      id: '1',
      piece: 'Pawn',
      points: '1',
    };
    expect(res.body).toEqual(firstEntity);
  });
  afterAll(() => {
    pool.end();
  });
});
