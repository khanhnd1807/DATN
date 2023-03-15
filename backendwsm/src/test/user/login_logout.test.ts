import { truncate } from "fs";
import request from "supertest";
import db from "../../database/models";
import app from "../../index";
import { seedAdmin, seedMember } from "../data/seed";
import { getToken } from "../token/getToken";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";

describe("jesting testing: login_logout", () => {
  beforeAll(async () => {
    await seedAdmin();
    await seedMember();
  });

  describe("[POST]/login", () => {
    test("login successfully - 200 ok", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "admin@zinza.com.vn",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(response.body.user.user_id).not.toBeNull();
      expect(response.body.user.firstname).toBe("admin");
      expect(response.body.user.lastname).toBe("admin");
      expect(response.body.user.email).not.toBeNull();
      expect(response.body.user.firstname).not.toBeNull();
      expect(response.body.user.lastname).not.toBeNull();
      expect(response.body.user.gender).not.toBeNull();
      expect(response.body.user.birthday).not.toBeNull();
      expect(response.body.user.phone_number).not.toBeNull();
      expect(response.body.user.address).not.toBeNull();
      expect(response.body.user.join_company).not.toBeNull();
      expect(response.body.user.holidays).not.toBeNull();
      expect(response.body.user.role_position).not.toBeNull();
      expect(response.body.user.role_position).toBeLessThan(3);
    });

    test("email not from zinza - 422 field invalid (not match regex)", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "admin@gmail.com",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("you have to use email of Zinza");
    });

    test("password is invalid - 422 field invalid (length<5)", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "admin@zinza.com.vn",
          password: "1234",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("password atleast 5 characters");
    });

    test("account not found - 404 not found", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "admin546@zinza.com.vn",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Not found this account");
    });
  });

  describe("[GET]/logout", () => {
    beforeEach(async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "test@zinza.com.vn",
          password: "123456",
        });
      token = getToken(response).token;
      refreshtoken = getToken(response).refreshtoken;
    });

    test("logout successfully - 200 ok", async () => {
      const response = await request(app)
        .get("/logout")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("you are loging out !");
    });

    test("logout successfully when token invalid but refresh token valid - 200 ok", async () => {
      const response = await request(app)
        .get("/logout")
        .set("Cookie", [`token=12333`, `refreshtoken=${refreshtoken}`]);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("you are loging out !");
    });

    test("logout fail because token and refreshtoken invalid - 400 jwt malformed", async () => {
      const response = await request(app)
        .get("/logout")
        .set("Cookie", [`token=12333`, `refreshtoken=1234`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("logout fail because token empty - 404 not found access tokens", async () => {
      const response = await request(app)
        .get("/logout")
        .set("Cookie", [`refreshtoken=1234`]);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true, cascade: false });
  });
});
