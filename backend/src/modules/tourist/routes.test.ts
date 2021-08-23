import { ITourModel } from '@schemas/Tour';
import { ITouristModel } from '@schemas/Tourist';

import { DEFAULT_SERVER_URL } from '../../config';

const faker = require('faker');
const request = require('supertest');

let tourist: ITouristModel;
let tour: ITourModel;

it('Cadastrar Turista', async (done) => {
  const data = {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  const res = await request(DEFAULT_SERVER_URL).post('/v1/tourist').send(data);
  tourist = res.body;

  expect(res.status).toBe(200);
  expect(res.body.name).toEqual(tourist.name);
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

it('Postar comentário', async (done) => {
  const data = {
    tourId: tour._id,
    userId: tourist._id,
    text: faker.lorem.sentences(),
  };

  const res = await request(DEFAULT_SERVER_URL).post('/v1/tourComment').send(data);

  expect(res.status).toBe(200);
  expect(res.body.text).toEqual(data.text);
  done();
});

it('Pesquisar pelos passeios turísticos', async (done) => {
  const filters = {
    title: tour.title.substring(0, tour.title.length / 2),
  };

  const res = await request(DEFAULT_SERVER_URL).get('/v1/tour').query(filters);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  done();
});
