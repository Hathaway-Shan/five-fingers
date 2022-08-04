const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#get dogs returns a list of dog', async () => {
    const res = await request(app).get('/dogs');
    expect(res.body.length).toEqual(3);
  });
  it('#get dogs by id returns first row', async () => {
    const res = await request(app).get('/dogs/1');
    const firstEntity = {
      id: '1',
      name: 'Shadow',
      breed: 'Golden Retriever',
    };
    expect(res.body).toEqual(firstEntity);
  });
  afterAll(() => {
    pool.end();
  });
});
