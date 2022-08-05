/* eslint-disable indent */
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
  it('#get by id returns first value', async () => {
    const res = await request(app).get('/more_books/1');
    const firstEntity = {
      id: '1',
      title: 'Nightwatch',
      author: 'Terry Pratchett',
    };
    expect(res.body).toEqual(firstEntity);
  });
  it('#post insert more_books adds a new book', async () => {
    const res = await request(app).post('/more_books').send({
      title: 'The Tempest',
      author: 'William Shakespeare',
    });
    console.log('======>', res.body);
    // expect(res.body).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
