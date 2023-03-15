import request from "supertest";
import { getToken } from "../token/getToken";
import { seedAdmin, seedMember, seedDepartment } from "../data/seed";
import app from "../../index";
import db from "../../database/models";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";

describe("jesting testing: department", () => {
  beforeAll(async () => {
    await seedAdmin();
    await seedMember();
    await seedDepartment();
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

  describe("[GET]/department", () => {
    test("get department successfully - 200 ok", async () => {
      const response = await request(app)
        .get("/departments")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get department sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get("/departments")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    test("get department fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get("/departments")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get department fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get("/departments")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("get department fail because not a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get("/departments")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });
  });

  describe("[GET]/detail department", () => {
    test("get detail request successfully - 200 ok", async () => {
      const response = await request(app)
        .get(`/deparments/${1}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Division 1");
      expect(response.body.sign).toBe("D1");
      expect(response.body.lead).toBe(2);
    });

    test("get detail request sucessfully when  use token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .get(`/deparments/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Division 1");
      expect(response.body.sign).toBe("D1");
      expect(response.body.lead).toBe(2);
    });

    test("get detail request fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .get(`/deparments/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("get detail request fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .get(`/deparments/${1}`)
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("get detail request fail when not found department- 404 not found department", async () => {
      const response = await request(app)
        .get(`/deparments/${435345}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(" not found this department");
    });

    test("get detail department fail because not a admin - 403 forbidden", async () => {
      const response = await request(app)
        .get(`/deparments/${1}`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json");
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
    await db.Request.destroy({ truncate: true });
  });
});
