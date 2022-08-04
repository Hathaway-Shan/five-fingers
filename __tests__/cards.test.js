const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#get magic_cards returns a list of magic cards', async () => {
    const res = await request(app).get('/magic_cards');
    expect(res.body.length).toEqual(3);
  });
  it('#get magic_cards by id returns first row', async () => {
    const res = await request(app).get('/magic_cards/1');
    const firstEntity = {
      id: '1',
      name: 'Lighting Bolt',
      cmc: '1',
    };
    expect(res.body).toEqual(firstEntity);
  });
  afterAll(() => {
    pool.end();
  });
});
