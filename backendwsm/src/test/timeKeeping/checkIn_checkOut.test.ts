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

  describe("[POST]/check-in", () => {
    test("check in successfully - 200 ok", async () => {
      const response = await request(app)
        .post("/time-keepings/check-in")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.text).toBe("checkin successfully");
    });

    test("check in sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .post("/time-keepings/check-in")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.text).toBe("checkin successfully");
    });

    test("check in fail when  using token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .post("/time-keepings/check-in")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("check in fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .post("/time-keepings/check-in")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  describe("[PUT]/check-out", () => {
    beforeEach(async () => {
      await seedTimeKeeping();
    });

    test("check out successfully - 200 ok", async () => {
      const response = await request(app)
        .put("/time-keepings/check-out")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.text).toBe("checkout successfully");
    });

    test("check out successfully when using  token invalid but refreshtoken valid - 200 ok", async () => {
      const response = await request(app)
        .put("/time-keepings/check-out")
        .set("Cookie", [`token=3545`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.text).toBe("checkout successfully");
    });

    test("check out fail when  using token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .put("/time-keepings/check-out")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("check out fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .put("/time-keepings/check-out")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });
  afterEach(async () => {
    await db.User.destroy({ truncate: true });
    await db.Timekeeping.destroy({ truncate: true });
  });
});
