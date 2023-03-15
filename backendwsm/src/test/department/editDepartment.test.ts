import request from "supertest";
import { getToken } from "../token/getToken";
import {
  seedAdmin,
  seedDepartment,
  seedMember,
  seedMember1,
} from "../data/seed";
import app from "../../index";
import db from "../../database/models";
import { createDepartment } from "../data/department";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
let departmentId = BigInt(1);
let user_id = BigInt(0);
describe("jesting testing: department", () => {
  beforeEach(async () => {
    await seedAdmin();
    await seedMember();
    await seedMember1();
    await seedDepartment();
    const response = await request(app).post("/login").send({
      email: "test1@zinza.com.vn",
      password: "123456",
    });
    token = getToken(response).token;
    refreshtoken = getToken(response).refreshtoken;
    user_id = response.body.user.user_id;

    const response1 = await request(app).post("/login").send({
      email: "admin@zinza.com.vn",
      password: "123456",
    });
    token1 = getToken(response1).token;
    refreshtoken1 = getToken(response1).refreshtoken;
  });

  describe("[PUT]/edit-department", () => {
    test("edit department fail because not have permission - 403 forbidden", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createDepartment(),
          lead: user_id,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("edit department successfully - 200 ok", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          lead: user_id,
        });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Division 2");
      expect(response.body.sign).toBe("D2");
      expect(response.body.lead).toBe(user_id);
    });

    test("edit department fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .send({
          ...createDepartment(),
          lead: user_id,
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("edit department sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          lead: user_id,
        });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Division 2");
      expect(response.body.sign).toBe("D2");
      expect(response.body.lead).toBe(user_id);
    });

    test("edit department fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`refreshtoken=1245`])
        .send({
          ...createDepartment(),
          lead: user_id,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("edit department fail because name invalid - 422 field invalid (empty)", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          name: "",
          lead: user_id,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("name of department is not empty");
    });

    test("edit department fail because sign invalid - 422 field invalid (empty)", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          sign: "",
          lead: user_id,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("sign of department is not empty");
    });

    test("edit department fail because not found department - 404 not found", async () => {
      const response = await request(app)
        .put(`/departments/324234/edit`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          lead: user_id,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this department");
    });

    test("edit department fail because not found member - 404 not found", async () => {
      const response = await request(app)
        .put(`/departments/${departmentId}/edit`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createDepartment(),
          lead: 334534,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this member in department");
    });
  });

  afterEach(async () => {
    await db.User.destroy({ truncate: true });
    await db.Department.destroy({ truncate: true });
  });
});
