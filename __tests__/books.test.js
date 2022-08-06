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
  it('#post /more_books adds new book', async () => {
    const res = await request(app)
      .post('/more_books')
      .send({ title: 'Soul Music', author: 'Terry Pratchett' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      author: expect.any(String),
    });
  });
  it('#insert /more_books/:id updates a book', async () => {
    const res = await request(app)
      .put('/more_books/1')
      .send({ title: 'The Fifth Elephant' });
    expect(res.status).toBe(200);
    expect(res.body.title).toEqual('The Fifth Elephant');
  });
  it('#delete /more_books/:id deletes a book', async () => {
    const res = await request(app).delete('/more_books/1');
    expect(res.status).toBe(200);

    const bookResponse = await request(app).get('/more_books/1');
    expect(bookResponse.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
