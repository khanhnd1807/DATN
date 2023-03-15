import moment from "moment";
import request from "supertest";
import db from "../../../database/models";
import app from "../../../index";
import { seedAdmin, seedDepartment, seedMember } from "../../data/seed";
import { member, user } from "../../data/user";
import { getToken } from "../../token/getToken";
jest.useFakeTimers();

let token: string = "";
let refreshtoken: string = "";
let token1: string = "";
let refreshtoken1: string = "";
describe("jesting testing: edit member", () => {
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

  describe("[PUT]/members/id/edit", () => {
    test("edit member fail because user is not a admin- 403 forbidden", async () => {
      const response = await request(app)
        .put("/members/1/edit")
        .set("Cookie", [`token=${token}`, `refreshtoken=${refreshtoken}`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe("you dont have permission");
    });

    test("edit info member fail when admin use token and refreshtoken invalid -  400 jwt malformed", async () => {
      const response = await request(app)
        .put("/members/1/edit")
        .set("Cookie", [`token=1241}`, `refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("jwt malformed");
    });

    test("edit info member fail when token empty- 404 not found token", async () => {
      const response = await request(app)
        .put("/members/1/edit")
        .set("Cookie", [`refreshtoken=1245`])
        .set("accept", "application/json")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found access token ");
    });

    test("edit info member successfully when admin use invalid token but refresh token valid - 200 ok", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=24234}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          firstname: "lead one",
          lastname: "lead one",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe("lead one");
      expect(response.body.lastname).toBe("lead one");
      expect(response.body.gender).toBe(true);
      expect(moment(response.body.join_company).format("YYYY-MM-DD")).toBe(
        moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD")
      );
      expect(
        moment(response.body.becoming_offcial_employee).format("YYYY-MM-DD")
      ).toBe(moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD"));
      expect(response.body.phone_number).toBe("0862041662");
      expect(response.body.address).toBe("Hà Nội");
      expect(response.body.department_id).toBe(1);
    });

    test("edit info member successfully - 200 ok", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          firstname: "lead two",
          lastname: "lead two",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(200);
      expect(response.body.firstname).toBe("lead two");
      expect(response.body.lastname).toBe("lead two");
      expect(response.body.gender).toBe(true);
      expect(moment(response.body.join_company).format("YYYY-MM-DD")).toBe(
        moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD")
      );
      expect(
        moment(response.body.becoming_offcial_employee).format("YYYY-MM-DD")
      ).toBe(moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD"));
      expect(response.body.phone_number).toBe("0862041662");
      expect(response.body.address).toBe("Hà Nội");
      expect(response.body.department_id).toBe(1);
    });

    test("edit info member fail because not found account - 404  not found account", async () => {
      const response = await request(app)
        .put("/members/756823/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found this account");
    });

    test("edit info member fail because not found department - 404  not found department", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          department_id: 7979,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("not found department");
    });

    test("edit info member fail because lastname invalid - 422 field invalid (not match regex)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          lastname: "2345",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("lastname invalid");
    });

    test("edit info member fail because firstname invalid - 422 field invalid (not match regex)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          firstname: "23422",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("firstname invalid");
    });

    test("edit info member fail because gender invalid - 422 field invalid (not boolean)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          gender: 435,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("gender invalid");
    });

    test("edit info member fail because birthday invalid - 422 field invalid (not a date)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          birthday: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("birthday invalid");
    });

    test("edit info member fail because phone number invalid - 422 field invalid (not match regex)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          phone_number: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("phone number invalid");
    });

    test("edit info member fail because date join company invalid - 422 field invalid (not date)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          join_company: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Date of joining company invalid");
    });

    test("edit info member fail because address invalid - 422 field invalid (empty)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          address: "",
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("address invalid");
    });

    test("edit info member fail because holidays invalid - 422 field invalid (>12)", async () => {
      const response = await request(app)
        .put("/members/2/edit")
        .set("Cookie", [`token=${token1}}`, `refreshtoken=${refreshtoken1}`])
        .send({
          ...member(),
          holidays: 14,
        })
        .set("accept", "application/json")
        .expect("Content-Type", /json/);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("holidays invalid");
    });
  });
  afterAll(async () => {
    await db.User.destroy({ truncate: true });
  });
});
