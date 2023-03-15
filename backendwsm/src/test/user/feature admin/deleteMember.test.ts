import moment from "moment";
import request from "supertest";
import db from "../../../database/models";
import app from "../../../index";
import { seedAdmin, seedMember, seedMember1 } from "../../data/seed";
import { member, user } from "../../data/user";
import { getToken } from "../../token/getToken";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
let userId: BigInt = BigInt(0);
let userId1: BigInt = BigInt(0);
let userId2: BigInt = BigInt(0);
describe("jesting testing: delete member", () => {
  beforeAll(async () => {
    await seedAdmin();
    await seedMember();
    await seedMember1();
    const response = await request(app)
      .post("/login")
      .send({
        email: "test@zinza.com.vn",
        password: "123456",
      });
    token = getToken(response).token;
    refreshtoken = getToken(response).refreshtoken;
    userId = response.body.user.user_id;

    const response1 = await request(app)
      .post("/login")
      .send({
        email: "admin@zinza.com.vn",
        password: "123456",
      });
    token1 = getToken(response1).token;
    refreshtoken1 = getToken(response1).refreshtoken;
    userId1 = response1.body.user.user_id;

    const response2 = await request(app)
      .post("/login")
      .send({
        email: "test1@zinza.com.vn",
        password: "123456",
      });
    userId2 = response2.body.user.user_id;
  });

  describe("[DELETE]/members/id/delete", () => {
    test("delete member fail because user is not a admin- 403 forbidden", async () => {
      const response = await request(app)
        .delete("/members/1/delete")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("delete member fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .delete("/members/1/delete")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("delete member fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .delete("/members/1/delete")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("delete member successfully when admin use invalid token but refresh token valid - 200 ok", async () => {
      const response = await request(app)
        .delete(`/members/${userId}/delete`)
        .set("Cookie", [`token=24234}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Delete successfully!");
    });

    test("delete member successfully - 200 ok", async () => {
      const response = await request(app)
        .delete(`/members/${userId2}/delete`)
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Delete successfully!");
    });

    test("delete member fail because not found account - 404  not found account", async () => {
      const response = await request(app)
        .delete("/members/756823/delete")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this account");
    });

    test("delete member fail because not he is lead or admin - 403  account is lead/admin", async () => {
      const response = await request(app)
        .delete(`/members/${userId1}/delete`)
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(
        " this employee is lead or admin, you can not delete lead or admin."
      );
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
  });
});
