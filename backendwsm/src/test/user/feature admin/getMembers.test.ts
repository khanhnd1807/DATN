import request from "supertest";
import db from "../../../database/models";
import app from "../../../index";
import { getToken } from "../../token/getToken";
import { seedAdmin, seedMember } from "../../data/seed";
jest.useFakeTimers(); //tcpserverwrap

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
let userId: bigint = BigInt(0); // for select
let userFirstName: string = "";
let userLastName: string = "";

describe("jesting testing: members", () => {
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
    userId = response.body.user.user_id;
    userFirstName = response.body.user.firstname;
    userLastName = response.body.user.lastname;

    const response1 = await request(app)
      .post("/login")
      .send({
        email: "admin@zinza.com.vn",
        password: "123456",
      });
    token1 = getToken(response1).token;
    refreshtoken1 = getToken(response1).refreshtoken;
  });

  describe("[GET]/members", () => {
    test("get members fail because user is not a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get("/members")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("get info member successfully because user is admin - 200 ok", async () => {
      const response = await request(app)
        .get("/members")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get info member sucessfully when admin use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/members")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get info member fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/members")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get info member fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/members")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  describe("[GET]/info member", () => {
    test("get members fail because user not is a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get(`/members/${userId}`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("get info members successfully because user is admin - 200 ok", async () => {
      const response = await request(app)
        .get(`/members/${userId}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe(userFirstName);
      expect(response.body.lastname).toBe(userLastName);
    });

    test("get info member sucessfully when admin use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get(`/members/${userId}`)
        .set("Cookie", ["token=1241", `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe(userFirstName);
      expect(response.body.lastname).toBe(userLastName);
    });

    test("get info member fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get(`/members/${userId}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get info member fail when not found token- 404 not found token", async () => {
      const response = await request(app)
        .get("/members")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("get info members false because not found account - 404 not found this account", async () => {
      const response = await request(app)
        .get(`/members/1231231232`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this member");
    });
  });

  describe("[GET]/members in department", () => {
    test("get members fail because user is not a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get("/members/members-department/1")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("get members successfully because user is admin - 200 ok", async () => {
      const response = await request(app)
        .get("/members/members-department/1")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get members sucessfully when admin use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/members/members-department/1")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get members fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/members/members-department/1")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get members fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/members/members-department/1")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });
  afterAll(async () => {
    await db.User.destroy({ truncate: true });
  });
});
