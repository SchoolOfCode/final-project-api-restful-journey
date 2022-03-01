import request from "supertest";

import app from "./app.js";

describe("GET /list", function () {
  test("gives us back 200", async function () {
    const actual = await request(app).get("/list");
    expect(actual.statusCode).toBe(200);
  });
});

describe("GET /ingredients", function () {
  test("gives us back 200", async function () {
    const actual = await request(app).get("/ingredients");
    expect(actual.statusCode).toBe(200);
  });
});

describe("GET /users", function () {
  test("gives us back 200", async function () {
    const expectedBody = {
      success: true,
      payload: [
        {
          first_name: expect.any(String),
          id: expect.any(Number),
          last_name: expect.any(String),
          username: expect.any(String),
        },
      ],
      success: true,
    };

    const actual = await request(app).get("/users");
    expect(actual.body).toStrictEqual(expectedBody);
    expect(actual.statusCode).toBe(200);
  });
});

describe("GET /list", function () {
  test("gives us back 200", async function () {
    const actual = await request(app).get("/list");
    expect(actual.body).toHaveProperty("payload[0].list");
    expect(actual.statusCode).toBe(200);
  });
});

// describe("GET /ingredients/season/:season", function () {
//   test("gives us back 200", async function () {
//     const actual = await request(app).get("ingredients/season/winter");
//     expect(actual.body).toHaveProperty("payload");
//     expect(actual.statusCode).toBe(200);
//   });
// });

describe("POST /user/add", function () {
  test("gives us back 200", async function () {
    const actual = await request(app).get("/user/add");
    // .query({ val: 'Test1' })
    const body = {};
    expect(actual.body).toHaveProperty("payload[0].list");
    expect(actual.statusCode).toBe(200);
  });
});

let elementId;

describe("Test example", () => {
  // Hidden for simplicity
  test("POST /send", (done) => {
    request(app)
      .post("/send")
      .expect("Content-Type", /json/)
      .send({
        email: "francisco@example.com",
      })
      .expect(201)
      .expect((res) => {
        res.body.data.length = 2;
        res.body.data[0].email = "test@example.com";
        res.body.data[1].email = "francisco@example.com";
      })
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.data[1].id;
        return done();
      });
  });
  // More things come here
});
