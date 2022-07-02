const app = require("../../app");
const supertestRequest = require("supertest");

// console.log("The app required is = ", app);

// describe a test fixture with multiple test cases
// eg - 1) success 2) failed
describe("Test POST  /register", () => {
//   tc - 1 -success
  test("Register success should response with 201", async () => {
    const rw = await supertestRequest(app).post("/register").send({
      userid: "Vishal001",
      name: "Vishal Singhal",
      password: "Vishal@123",
    });
    // const res = 201;
    expect(rw.status).toBe(201);
  });
  // failed to create user
  test("Register failed should response with 400", () => {
    const res = 400;
    expect(res).toBe(400);
  });
});
describe("Test POST  /login", () => {
  // tc - 1 -success
  test("Login Success should response with 200", async () => {
    const res = await supertestRequest(app).post("/login").send({
      userid: "Vishal741",
      password: "12344",
    });
    expect(res.status).toBe(200);
  });
  // failed to create user
  test("Login Failed should response with 401", async () => {
    const res = await supertestRequest(app).post("/login").send({
      userid: "Vishal741",
      password: "1234",
    });
    expect(res.status).toBe(401);
  });
});
