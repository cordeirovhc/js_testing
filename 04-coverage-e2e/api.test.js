const { describe, it } = require("mocha");
const request = require("supertest");
const assert = require("assert");
const app = require("./api");

describe("API Test Suite", () => {
  describe("/contact", () => {
    it("should request contact page and return status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to default", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "hello world");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return http status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "cordeirovhc", password: "123456" })
        .expect(200);

      assert.deepStrictEqual(response.text, "login ok");
    });
  });

  describe("/login", () => {
    it("should fail and return http status 401 when invalid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "john", password: "123456" })
        .expect(401);

      assert.ok(response.unauthorized); // true
      assert.deepStrictEqual(response.text, "login fail");
    });
  });
});
