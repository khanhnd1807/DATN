import request from "supertest";
import app from "../../../index";
import { getToken } from "../../token/getToken";
import { seedAdmin, seedDepartment, seedMember } from "../../data/seed";
import db from "../../../database/models";
import { member, user } from "../../data/user";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
describe("jesting testing: create member", () => {
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
  describe("[POST]/signUp", () => {
    test("signup false because user is not a admin- 403 forbidden", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("Accept", "application/json")
        .expect("Content-Type", /json/);
    });

    test("signup member fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("signup member fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("signup member successfully when admin use invalid token but refresh token valid - 200 ok", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=24234`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong@zinza.com.vn",
          password: "123456",
          firstname: "truong",
          lastname: "nguyen",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe("truong");
      expect(response.body.lastname).toBe("nguyen");
      expect(response.body.email).toBe("truong@zinza.com.vn");
      expect(response.body.gender).toBe(true);
      expect(response.body.phone_number).toBe("0862041662");
      expect(response.body.address).toBe("Hà Nội");
      expect(response.body.department_id).toBe(1);
    });

    test("signup member successfully - 200 ok", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123@zinza.com.vn",
          firstname: "truong",
          lastname: "nguyen",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe("truong");
      expect(response.body.lastname).toBe("nguyen");
      expect(response.body.email).toBe("truong123@zinza.com.vn");
      expect(response.body.gender).toBe(true);
      expect(response.body.phone_number).toBe("0862041662");
      expect(response.body.address).toBe("Hà Nội");
      expect(response.body.department_id).toBe(1);
    });

    test("signup member fail because email is exist - 409 account exist", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "admin@zinza.com.vn",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("this account exist");
    });

    test("signup member fail because email invalid - 422 field invalid (not use email zinza)", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123@gmail.com",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("you have to use email of Zinza");
    });

    test("signup member fail because firstname invalid - 422 field invalid (not match regex) ", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123d@zinza.com.vn",
          firstname: "23132",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("firstname invalid");
    });

    test("signup member fail because lastname invalid - 422 field invalid (not match regex) ", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123d@zinza.com.vn",
          lastname: "",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("lastname invalid");
    });

    test("signup member fail because birthday invalid - 422 field invalid (not a day) ", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123d@zinza.com.vn",
          birthday: "",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("birthday invalid");
    });

    test("signup member fail because phone number invalid - 422 field invalid (not match regex) ", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123d@zinza.com.vn",
          phone_number: "086204165662",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("phone number invalid");
    });

    test("signup member fail because date of join company invalid - 422 field invalid (not match regex) ", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123d@zinza.com.vn",
          join_company: "",
          password: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Date of joining company invalid");
    });

    test("signup member fail because not found department  - 404 not found department ", async () => {
      const response = await request(app)
        .post("/signup")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          email: "truong123d@zinza.com.vn",
          password: "123456",
          department_id: 345345,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found department");
    });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true });
  });
});
