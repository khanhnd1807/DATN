import request from "supertest";
import db from "../../database/models";
import app from "../../index";
import { seedAdmin, seedDepartment, seedMember } from "../data/seed";
import { user } from "../data/user";
import { getToken } from "../token/getToken";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
describe("jesting testing: profile", () => {
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

  describe("[GET]/profile", () => {
    test("get profile successfully 200-ok", async () => {
      const response = await request(app)
        .get("/profile")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(response.body.user.user_id).not.toBeNull();
      expect(response.body.user.firstname).toBe("admin");
      expect(response.body.user.lastname).toBe("admin");
      expect(response.body.user.email).not.toBeNull();
      expect(response.body.user.firstname).not.toBeNull();
      expect(response.body.user.lastname).not.toBeNull();
      expect(response.body.user.gender).not.toBeNull();
      expect(response.body.user.birthday).not.toBeNull();
      expect(response.body.user.phone_number).not.toBeNull();
      expect(response.body.user.address).not.toBeNull();
      expect(response.body.user.join_company).not.toBeNull();
      expect(response.body.user.holidays).not.toBeNull();
      expect(response.body.user.role_position).not.toBeNull();
      expect(response.body.user.role_position).toBeLessThan(3);
    });

    test("get profile when token invalid but refeshtoken valid 200-ok", async () => {
      const response = await request(app)
        .get("/profile")
        .set("Cookie", [`token=${12345}`, `refreshtoken=${refreshtoken1}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(response.body.user.user_id).not.toBeNull();
      expect(response.body.user.firstname).toBe("admin");
      expect(response.body.user.lastname).toBe("admin");
      expect(response.body.user.email).not.toBeNull();
      expect(response.body.user.firstname).not.toBeNull();
      expect(response.body.user.lastname).not.toBeNull();
      expect(response.body.user.gender).not.toBeNull();
      expect(response.body.user.birthday).not.toBeNull();
      expect(response.body.user.phone_number).not.toBeNull();
      expect(response.body.user.address).not.toBeNull();
      expect(response.body.user.join_company).not.toBeNull();
      expect(response.body.user.holidays).not.toBeNull();
      expect(response.body.user.role_position).not.toBeNull();
      expect(response.body.user.role_position).toBeLessThan(3);
    });

    test("cannot get profile when token and refreshtoken invalid - 400 jwt malformed", async () => {
      const response = await request(app)
        .get("/profile")
        .set("Cookie", [`token=1233`, `refreshtoken=12423`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("cannot get profile when token  empty - 404 not found token", async () => {
      const response = await request(app)
        .get("/profile")
        .set("Cookie", [])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });
  });

  describe("[PUT]/profile", () => {
    test("edit profile successfully-200 ok", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token1}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...user(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
      expect(response.body.user.user_id).not.toBeNull();
      expect(response.body.user.firstname).toBe("admin one");
      expect(response.body.user.lastname).toBe("admin one");
      expect(response.body.user.email).not.toBeNull();
      expect(response.body.user.firstname).not.toBeNull();
      expect(response.body.user.lastname).not.toBeNull();
      expect(response.body.user.gender).not.toBeNull();
      expect(response.body.user.birthday).not.toBeNull();
      expect(response.body.user.phone_number).not.toBeNull();
      expect(response.body.user.address).not.toBeNull();
      expect(response.body.user.join_company).not.toBeNull();
      expect(response.body.user.holidays).not.toBeNull();
      expect(response.body.user.role_position).not.toBeNull();
      expect(response.body.user.role_position).toBeLessThan(3);
    });

    test("edit profile because token invalid but refreshtoken valid - 200 ok", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=234234`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...user(),
          firstname: "admin",
          lastname: "admin",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(response.body.user.user_id).not.toBeNull();
      expect(response.body.user.firstname).toBe("admin");
      expect(response.body.user.lastname).toBe("admin");
      expect(response.body.user.email).not.toBeNull();
      expect(response.body.user.firstname).not.toBeNull();
      expect(response.body.user.lastname).not.toBeNull();
      expect(response.body.user.gender).not.toBeNull();
      expect(response.body.user.birthday).not.toBeNull();
      expect(response.body.user.phone_number).not.toBeNull();
      expect(response.body.user.address).not.toBeNull();
      expect(response.body.user.join_company).not.toBeNull();
      expect(response.body.user.holidays).not.toBeNull();
      expect(response.body.user.role_position).not.toBeNull();
      expect(response.body.user.role_position).toBeLessThan(3);
    });

    test("cannot edit profile because token and refreshtoken invalid - 400 jwt malformed", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=234234`, `refreshtoken=2342`])
        .send({
          ...user(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("cannot edit profile because token empty - 404 not found token", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`refreshtoken=2342`])
        .send({
          ...user(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("cannot edit profile because firstname invalid - 422 field invalid (contain special characters)", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...user(),
          firstname: "123456",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("firstname invalid");
    });

    test("cannot edit profile because lastname invalid - 422 field invalid (not match regex)", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...user(),
          lastname: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("lastname invalid");
    });

    test("cannot edit profile because gender invalid - 422 field invalid (not boolean)", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...user(),
          gender: "haha",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("gender invalid");
    });

    test("cannot edit profile because phone number empty - 422 field invalid (not match regex)", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...user(),
          phone_number: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("phone number invalid");
    });

    test("cannot edit profile because birthday invalid - 422 field invalid (not a day)", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...user(),
          birthday: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("birthday invalid");
    });

    test("cannot edit profile because adress invalid - 422 field invalid (invalid)", async () => {
      const response = await request(app)
        .put("/profile")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .send({
          ...user(),
          address: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(422);
      expect(response.body.message).toBe("address invalid");
    });
  });
  afterAll(async () => {
    await db.User.destroy({ truncate: true });
  });
});
