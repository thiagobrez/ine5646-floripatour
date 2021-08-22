import { DEFAULT_SERVER_URL } from '../../config';

const request = require('supertest');

it('Cadastrar guia', async (done) => {
  const guide = {
    name: 'Guia 1',
    username: 'guia-1',
    password: 's3cr3t',
    registryNumber: '123456',
    email: 'guia1@floripatour.com',
    phone: '48999450081',
    active: true,
  };

  const res = await request(DEFAULT_SERVER_URL).post('/v1/guide/create').send(guide);

  // console.log('res', res);

  expect(res.status).toBe(200);
  done();
});
