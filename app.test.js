import request from 'supertest';

import app from './app.js';

describe('GET /', function () {
  test('gives us back 404, with a message', async function () {
    const expectedBody = {
      message: "We couldn't find what you were looking for 😞",
    };
    const actual = await request(app).get('/');
    expect(actual.body).toStrictEqual(expectedBody);
    expect(actual.statusCode).toBe(404);
  });
});

describe('GET /users', function () {
  test('gives us back 200, with a payload', async function () {
    const actual = await request(app).get('/users');
    expect(actual.body).toHaveProperty('payload');
    expect(actual.statusCode).toBe(200);
  });
  test('gives us back a payload with specific shape for each user', async function () {
    const actual = await request(app).get('/users');
    const expectedPayload = {
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      favourites: expect.any(Array),
      list: expect.any(Array),
    };
    actual.body.payload.forEach(function (user) {
      expect(user).toStrictEqual(expectedPayload);
    });
  });
});

describe('GET /users/list/:id', function () {
  test('give us back user list as an array', async function () {
    const actual = await request(app).get('/users/list/105699898494061416388');
    const expectedPayload = {
      list: expect.any(Array),
    };
    expect(actual.body.payload[0]).toStrictEqual(expectedPayload);
    expect(200);
  });
});

describe('GET /ingredients', function () {
  test('gives us back 200 on ingredientes route with a payload', async function () {
    const actual = await request(app).get('/ingredients');
    expect(actual.body).toHaveProperty('payload');
    expect(actual.statusCode).toBe(200);
  });
  test('gives us back 200 querying ingredients by season, with a payload', async function () {
    const actual = await request(app).get('/ingredients/season/winter');
    expect(actual.body).toHaveProperty('payload');
    expect(200);
  });
});

describe('GET /ingredients/season', function () {
  test('gives us back the ingredients in season', async function () {
    const actual = await request(app).get('/ingredients/season/spring');
    const expectedSeason = 'spring';
    actual.body.payload.forEach(function (ingredient) {
      expect(ingredient.season).toContain(expectedSeason);
    });
    expect(actual.body).toHaveProperty('payload');
    expect(200);
  });
});

describe('POST /users', function () {
  test('return bad request if email is missing', async function () {
    const actual = await request(app)
      .post('/users')
      .send({})
      // .expect(actual.body).toStrictEqual('user must have an email')
      .expect(400);
  });

  test('user is created with the rigth data structure', async function () {
    const expectedPayload = {
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      favourites: expect.any(Array),
      list: [expect.any(Array)],
    };
    const actual = await request(app)
      .post('/users')
      .send({
        username: 'Tony',
        email: '222',
        favourites: [],
        list: [],
      })
      .expect(201);
    // console.log('console body' ,actual.body.payload)
    // .expect(actual.body.payload).toStrictEqual(expectedPayload)
  });
});
