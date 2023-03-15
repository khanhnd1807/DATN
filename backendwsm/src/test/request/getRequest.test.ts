import request from "supertest";
import { getToken } from "../token/getToken";
import { seedAdmin, seedMember, seedRequest } from "../data/seed";
import app from "../../index";
import db from "../../database/models";
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

  describe("[GET]/requests", () => {
    test("get request successfully - 200 ok", async () => {
      const response = await request(app)
        .get("/requests")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get requests sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/requests")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get requests fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/requests")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get requests fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/requests")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  describe("[GET]/detail requests", () => {
    test("get detail request successfully - 200 ok", async () => {
      const response = await request(app)
        .get(`/requests/${1}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get detail request sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get(`/requests/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get detail request fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get(`/requests/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get detail request fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get(`/requests/${1}`)
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("get detail request fail when not found department- 404 not found request", async () => {
      const response = await request(app)
        .get(`/requests/${435345}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this request");
    });
  });

  describe("[GET]/members-requests", () => {
    test("get members requests fail because user is not a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get("/requests-member")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("get members requests successfully because user is admin - 200 ok", async () => {
      const response = await request(app)
        .get("/requests-member")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get members requests sucessfully when admin use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/requests-member")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get members requests fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/requests-member")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get members requests fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/requests-member")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  describe("[GET]/members-requests-processed", () => {
    test("get request processed fail because user is not a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get(`/requests/requests-processed/${1}`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("get members requests successfully because user is admin - 200 ok", async () => {
      const response = await request(app)
        .get(`/requests/requests-processed/${1}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get members requests sucessfully when admin use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get(`/requests/requests-processed/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get members requests fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get(`/requests/requests-processed/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get members requests fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get(`/requests/requests-processed/${1}`)
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
    await db.Request.destroy({ truncate: true });
  });
});
