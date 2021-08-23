import { IGuideModel } from '@schemas/Guide';

import { DEFAULT_SERVER_URL } from '../../config';

const faker = require('faker');
const request = require('supertest');

let guide: IGuideModel;

it('Cadastrar guia', async (done) => {
  const data = {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    registryNumber: faker.random.number(),
    email: faker.internet.email(),
    phone: faker.random.number().toString(),
    active: true,
  };

  const res = await request(DEFAULT_SERVER_URL).post('/v1/guide').send(data);
  guide = res.body;

  expect(res.status).toBe(200);
  expect(res.body.name).toEqual(guide.name);
  expect(res.body.active).toBe(true);
  done();
});

it('Listar todos os guias', async (done) => {
  const res = await request(DEFAULT_SERVER_URL).get('/v1/guide');

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  done();
});

it('Mudar a situação de um guia para inativo', async (done) => {
  const data = { active: false };

  const res = await request(DEFAULT_SERVER_URL).put(`/v1/guide/${guide._id}`).send(data);
  guide = res.body;

  expect(res.status).toBe(200);
  expect(res.body._id).toEqual(guide._id);
  expect(res.body.active).toBe(false);
  done();
});
