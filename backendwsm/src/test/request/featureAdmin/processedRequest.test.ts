import request from "supertest";
import { getToken } from "../../token/getToken";
import { seedAdmin, seedMember, seedRequest } from "../../data/seed";
import app from "../../../index";
import db from "../../../database/models";
import { createRequest } from "../../data/request";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";

describe("jesting testing: request", () => {
  beforeEach(async () => {
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

  describe("[PUT]/accept-request", () => {
    test("accept request successfully - 200 ok", async () => {
      const response = await request(app)
        .put(`/requests/${1}/accept`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.detail).toBe("Làm thêm giờ");
      expect(response.body.description).toBe("hehehe");
    });

    test("accept request fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .put(`/requests/${1}/accept`)
        .set("Cookie", [`token=1241`, `refreshtoken=1245`]);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("accept request sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .put(`/requests/${1}/accept`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(1);
      expect(response.body.detail).toBe("Làm thêm giờ");
      expect(response.body.description).toBe("hehehe");
    });

    test("accept request fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .put(`/requests/${1}/accept`)
        .set("Cookie", [`refreshtoken=1245`]);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("accept request fail because request has been processed or not found - 404 not found", async () => {
      const response = await request(app)
        .put(`/requests/${3423}/accept`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`]);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "not found this request or this request has been processed"
      );
    });

    test("accept request fail because not permission - 403 forbidden", async () => {
      const response = await request(app)
        .put(`/requests/${1}/accept`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`]);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });
  });

  describe("[PUT]/reject-request", () => {
    test("reject request successfully - 200 ok", async () => {
      const response = await request(app)
        .put(`/requests/${1}/reject`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(2);
      expect(response.body.detail).toBe("Làm thêm giờ");
      expect(response.body.description).toBe("hehehe");
    });

    test("reject request fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .put(`/requests/${1}/reject`)
        .set("Cookie", [`token=1241`, `refreshtoken=1245`]);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("reject request sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .put(`/requests/${1}/reject`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken1}`]);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(2);
      expect(response.body.detail).toBe("Làm thêm giờ");
      expect(response.body.description).toBe("hehehe");
    });

    test("reject request fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .put(`/requests/${1}/reject`)
        .set("Cookie", [`refreshtoken=1245`]);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("reject request fail because request has been processed or not found - 404 not found", async () => {
      const response = await request(app)
        .put(`/requests/${3423}/reject`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`]);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "not found this request or this request has been processed"
      );
    });

    test("reject request fail because not permission - 403 forbidden", async () => {
      const response = await request(app)
        .put(`/requests/${1}/reject`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`]);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });
  });

  afterEach(async () => {
    await db.User.destroy({ truncate: true });
    await db.Request.destroy({ truncate: true });
  });
});
