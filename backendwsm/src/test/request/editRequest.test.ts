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

  describe("[PUT]/edit-request", () => {
    test("edit request successfully - 200 ok", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createRequest(),
          detail: "Mượn tài sản",
          phone_number: "0862042663",
        });
      expect(response.status).toBe(200);
      expect(response.body.detail).toBe("Mượn tài sản");
      expect(response.body.phone_number).toBe("0862042663");
    });

    test("edit request fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`token=1241`, `refreshtoken=1245`])
        .send({
          ...createRequest(),
          detail: "nghỉ có lương",
          phone_number: "0862042663",
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("edit request sucessfully when  using token invalid but refreshtoken valid - 200 ok ", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`token=1241}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createRequest(),
          detail: "nghỉ có lương",
          phone_number: "0862042663",
        });
      expect(response.status).toBe(200);
      expect(response.body.detail).toBe("nghỉ có lương");
      expect(response.body.phone_number).toBe("0862042663");
    });

    test("edit request fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`refreshtoken=1245`])
        .send({
          ...createRequest(),
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("edit request fail because field invalid - 422 field invalid", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createRequest(),
          detail: "",
        });

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("detail is empty");
    });

    test("edit request fail because field invalid - 422 field invalid", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...createRequest(),
          phone_number: "",
        });

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("phone number invalid");
    });

    test("edit request fail because request because he did not make this request - 404 not found", async () => {
      const response = await request(app)
        .put(`/requests/${1}`)
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...createRequest(),
        });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found request");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
    await db.Request.destroy({ truncate: true });
  });
});
