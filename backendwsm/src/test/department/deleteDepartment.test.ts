import request from "supertest";
import { getToken } from "../token/getToken";
import {
  seedAdmin,
  seedDepartment,
  seedDepartment1,
  seedMember,
} from "../data/seed";
import app from "../../index";
import db from "../../database/models";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
let departmentId = BigInt(1);

describe("jesting testing: department", () => {
  beforeEach(async () => {
    await seedAdmin();
    await seedMember();
    await seedDepartment();
    await seedDepartment1();

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
  describe("[DELETE]/delete-department", () => {
    test("delete department fail because not have permission - 403 forbidden", async () => {
      const response = await request(app)
        .delete(`/departments/${departmentId}/delete`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("delete department successfully - 200 ok", async () => {
      const response = await request(app)
        .delete(`/departments/${BigInt(2)}/delete`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Delete successfully!");
    });

    test("delete department fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .delete(`/departments/${departmentId}/delete`)
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`]);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("delete department sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .delete(`/departments/${BigInt(2)}/delete`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Delete successfully!");
    });

    test("delete department fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .delete(`/departments/${departmentId}/delete`)
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("delete department fail because not found department - 404 not found", async () => {
      const response = await request(app)
        .delete(`/departments/324234/delete`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this department");
    });

    test("delete department fail because department have member - 405 data exist", async () => {
      const response = await request(app)
        .delete(`/departments/${departmentId}/delete`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(405);
      expect(response.body.message).toBe(
        "this department have employees, you cannot delete department when it is not empty"
      );
    });
  });

  afterEach(async () => {
    await db.User.destroy({ truncate: true });
    await db.Department.destroy({ truncate: true });
  });
});
