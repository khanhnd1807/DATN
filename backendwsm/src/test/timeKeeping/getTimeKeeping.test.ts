import request from "supertest";
import { getToken } from "../token/getToken";
import { seedAdmin, seedMember, seedTimeKeeping } from "../data/seed";
import app from "../../index";
import db from "../../database/models";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";

describe("jesting testing: timekeeping", () => {
  beforeAll(async () => {
    await seedAdmin();
    await seedMember();
    await seedTimeKeeping();
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@zinza.com.vn",
        password: "123456",
      });
    token = getToken(response).token;
    refreshtoken = getToken(response).refreshtoken;

    const response1 = await request(app)
      .post("/login")
      .send({
        email: "admin@zinza.com.vn",
        password: "123456",
      });
    token1 = getToken(response1).token;
    refreshtoken1 = getToken(response1).refreshtoken;
  });

  describe("[GET]/time-keepings", () => {
    test("get timekeepings successfully - 200 ok", async () => {
      const response = await request(app)
        .get("/time-keepings")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get timekeepings sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/time-keepings")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get timekeepings fail when  using token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/time-keepings")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get timekeepings fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/time-keepings")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  describe("[GET]/time-keeping", () => {
    test("get timekeepings successfully - 200 ok", async () => {
      const response = await request(app)
        .get("/time-keeping")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get timekeepings sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/time-keeping")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get timekeepings fail when  using token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/time-keeping")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get timekeepings fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/time-keeping")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });
  afterAll(async () => {
    await db.User.destroy({ truncate: true });
    await db.Timekeeping.destroy({ truncate: true });
  });
});
