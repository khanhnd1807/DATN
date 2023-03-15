import request from "supertest";
import { getToken } from "../token/getToken";
import { seedAdmin, seedMember, seedRequest } from "../data/seed";
import app from "../../index";
import db from "../../database/models";
import { createRequest } from "../data/request";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";

describe("jesting testing: request", () => {
  beforeAll(async () => {
    await seedAdmin();
    await seedMember();
    await seedRequest();
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

  describe("[POST]/create-request", () => {
    test("create request successfully - 200 ok", async () => {
      const response = await request(app)
        .post("/requests")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          detail: "Làm thêm giờ",
          phone_number: "0862041663",
          time_start: new Date(),
          time_end: new Date(),
          description: "hehehe",
        });
      expect(response.status).toBe(200);
      expect(response.text).toBe("create successfully");
    });

    test("create request fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .post("/requests")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`]);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("create request sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .post("/requests")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createRequest(),
        });
      expect(response.status).toBe(200);
      expect(response.text).toBe("create successfully");
    });

    test("create request fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .post("/requests")
        .set("Cookie", [`refreshtoken=1245`])
        .send({
          ...createRequest(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("create request fail because field invalid - 422 field invalid", async () => {
      const response = await request(app)
        .post("/requests")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createRequest(),
          detail: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("detail is empty");
    });

    test("create request fail because field invalid - 422 field invalid", async () => {
      const response = await request(app)
        .post("/requests")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createRequest(),
          phone_number: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("phone number invalid");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
    await db.Request.destroy({ truncate: true });
  });
});
