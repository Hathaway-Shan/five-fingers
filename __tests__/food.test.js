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
  it('#get foods by id returns first row', async () => {
    const res = await request(app).get('/food/1');
    const firstEntity = {
      id: '1',
      name: 'Pizza',
      cuisine: 'Italian',
    };
    expect(res.body).toEqual(firstEntity);
  });
  it('#post /food adds new food', async () => {
    const res = await request(app).post('/food').send({
      name: 'Pho',
      cuisine: 'Thai',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      cuisine: expect.any(String),
    });
  });
  it('#insert /food/:id updates a food', async () => {
    const res = await request(app).put('/food/1').send({ name: 'Lasagne' });
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('Lasagne');
  });
  it('#delete /food/:id deletes a food', async () => {
    const res = await request(app).delete('/food/1');
    expect(res.status).toBe(200);

    const bookResponse = await request(app).get('/food/1');
    expect(bookResponse.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
