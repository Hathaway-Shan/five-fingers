const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#get foods returns a list of foods', async () => {
    const res = await request(app).get('/food');
    expect(res.body.length).toEqual(3);
  });
  afterAll(() => {
    pool.end();
  });
});
