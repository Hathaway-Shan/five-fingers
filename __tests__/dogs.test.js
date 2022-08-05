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
  it('#post /dogs adds new dog', async () => {
    const res = await request(app).post('/dogs').send({
      name: 'Buddy',
      breed: 'Golden Retriever',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
    });
  });
  it('#insert /dogs/:id updates a dog', async () => {
    const res = await request(app).put('/dogs/1').send({ name: 'Sunshine' });
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('Sunshine');
  });
  afterAll(() => {
    pool.end();
  });
});
