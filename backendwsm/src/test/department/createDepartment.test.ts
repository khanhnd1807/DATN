import request from "supertest";
import { getToken } from "../token/getToken";
import { seedAdmin, seedMember, seedRequest } from "../data/seed";
import app from "../../index";
import db from "../../database/models";
import { createDepartment } from "../data/department";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";

describe("jesting testing: department", () => {
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

  describe("[POST]/create-department", () => {
    test("create department fail because not have permission - 403 forbidden", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createDepartment(),
        });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("create department successfully - 200 ok", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          name: "Division 2",
          sign: "D2",
        });
      expect(response.status).toBe(200);
      expect(response.text).toBe("create new Department successfully");
    });

    test("create department fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .send({
          ...createDepartment(),
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("create department sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .send({
          name: "Support Group",
          sign: "SG",
        });
      expect(response.status).toBe(200);
      expect(response.text).toBe("create new Department successfully");
    });

    test("create department fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`refreshtoken=1245`])
        .send({
          ...createDepartment(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("create department fail because name invalid - 422 field invalid (empty)", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          name: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("name of department is not empty");
    });

    test("create department fail because sign invalid - 422 field invalid (empty)", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          sign: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("sign of department is not empty");
    });

    test("create department fail because name of sign is exist - 405  data exist", async () => {
      const response = await request(app)
        .post("/departments")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(405);
      expect(response.body.message).toBe("This name or sign is exist");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
    await db.Department.destroy({ truncate: true });
  });
});
