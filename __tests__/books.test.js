const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#get more_books returns a list of books', async () => {
    const res = await request(app).get('/more_books');
    expect(res.body.length).toEqual(3);
  });
  afterAll(() => {
    pool.end();
  });
});
