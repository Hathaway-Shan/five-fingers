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
  it('#post /magic_cards adds new card', async () => {
    const res = await request(app).post('/magic_cards').send({
      name: 'Thalia, Guardian of Thraben',
      cmc: '2',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      cmc: expect.any(String),
    });
  });
  it('#insert /magic_cards/:id updates a card', async () => {
    const res = await request(app)
      .put('/magic_cards/1')
      .send({ name: 'Shock' });
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('Shock');
  });
  it('#delete /magic_cards/:id deletes a card', async () => {
    const res = await request(app).delete('/magic_cards/1');
    expect(res.status).toBe(200);

    const bookResponse = await request(app).get('/magic_cards/1');
    expect(bookResponse.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
