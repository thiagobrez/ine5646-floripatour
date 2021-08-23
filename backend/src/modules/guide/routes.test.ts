import { IGuideModel } from '@schemas/Guide';
import { ITourModel } from '@schemas/Tour';

import { DEFAULT_SERVER_URL } from '../../config';

const faker = require('faker');
const request = require('supertest');

let guide: IGuideModel;
let tour: ITourModel;

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

it('Trocar a senha inicial', async (done) => {
  const data = {
    password: faker.internet.password(),
  };

  const res = await request(DEFAULT_SERVER_URL).put(`/v1/guide/${guide._id}`).send(data);

  expect(res.status).toBe(200);
  // TODO: Check password hash
  done();
});

it('Alterar dados cadastrais', async (done) => {
  const data = {
    name: faker.name.findName(),
    username: faker.internet.userName(),
  };

  const res = await request(DEFAULT_SERVER_URL).put(`/v1/guide/${guide._id}`).send(data);
  guide = res.body;

  expect(res.status).toBe(200);
  expect(res.body.name).toEqual(data.name);
  expect(res.body.username).toEqual(data.username);
  done();
});

it('Cadastrar um passeio turístico', async (done) => {
  const data = {
    title: faker.random.words(),
    description: faker.lorem.sentence(),
    images: [],
    startLocation: faker.address.streetAddress(),
    endLocation: faker.address.streetAddress(),
    startTime: '07:00',
    endTime: '18:00',
    minTourists: 5,
    maxTourists: 25,
    price: faker.random.number(),
  };

  const res = await request(DEFAULT_SERVER_URL).post('/v1/tour').send(data);
  tour = res.body;

  expect(res.status).toBe(200);
  expect(res.body.title).toEqual(data.title);
  expect(res.body.active).toBe(true);
  done();
});

it('Mudar a situação de um passeio para inativo', async (done) => {
  const data = {
    active: false,
  };

  const res = await request(DEFAULT_SERVER_URL).put(`/v1/tour/${tour._id}`).send(data);
  tour = res.body;

  expect(res.status).toBe(200);
  expect(res.body.active).toBe(false);
  done();
});

it('Registrar as datas disponíveis para realização do passeio', async (done) => {
  const data = {
    availableDates: [
      new Date(2021, 2, 15).getTime(),
      new Date(2021, 6, 20).getTime(),
      new Date().getTime(),
    ],
  };

  const res = await request(DEFAULT_SERVER_URL).put(`/v1/tour/${tour._id}`).send(data);
  tour = res.body;

  expect(res.status).toBe(200);
  expect(res.body.availableDates[0]).toEqual(data.availableDates[0]);
  done();
});
