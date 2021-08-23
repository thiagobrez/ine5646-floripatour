import { DEFAULT_SERVER_URL } from '../../config';

const request = require('supertest');

it('Logar como Admin', async (done) => {
  const data = {
    username: 'admin',
    password: 'admin',
  };

  const res = await request(DEFAULT_SERVER_URL).post('/login').send(data);

  expect(res.status).toBe(302);
  done();
});
