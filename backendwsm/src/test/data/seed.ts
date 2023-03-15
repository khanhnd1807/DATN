import moment from "moment/moment";
import db from "../../database/models";

export const seedAdmin = async () => {
  await db.User.create({
    email: "admin@zinza.com.vn",
    firstname: "admin",
    lastname: "admin",
    avatar: "",
    gender: true,
    birthday: new Date(),
    phone_number: "0862041662",
    address: "hà nội",
    password: "$2a$10$.xT2f8A4JCOlmYn6NIzlVugpCuI/a8wUbTlKLTbTbGK8shToGnbMS",
    becoming_offcial_employee: null,
    join_company: new Date(),
    holidays: 0,
    department_id: BigInt(1),
    role_position: 2,
  });
};

export const seedMember = async () => {
  await db.User.create({
    email: "test@zinza.com.vn",
    firstname: "test",
    lastname: "test",
    avatar: "",
    gender: true,
    birthday: new Date(),
    phone_number: "0862041662",
    address: "hà nội",
    password: "$2a$10$.xT2f8A4JCOlmYn6NIzlVugpCuI/a8wUbTlKLTbTbGK8shToGnbMS",
    becoming_offcial_employee: null,
    join_company: new Date(),
    holidays: 0,
    department_id: BigInt(1),
    role_position: 0,
  });
};

export const seedMember1 = async () => {
  await db.User.create({
    email: "test1@zinza.com.vn",
    firstname: "test",
    lastname: "test",
    avatar: "",
    gender: true,
    birthday: new Date(),
    phone_number: "0862041662",
    address: "hà nội",
    password: "$2a$10$.xT2f8A4JCOlmYn6NIzlVugpCuI/a8wUbTlKLTbTbGK8shToGnbMS",
    becoming_offcial_employee: null,
    join_company: new Date(),
    holidays: 0,
    department_id: BigInt(1),
    role_position: 0,
  });
};

export const seedRequest = async () => {
  await db.Request.create({
    user_id: 2,
    created_at: new Date(),
    detail: "Làm thêm giờ",
    phone_number: "0862041663",
    email_user: "test@zinza.com.vn",
    time_start: new Date(),
    time_end: new Date(),
    description: "hehehe",
  });
};

export const seedDepartment = async () => {
  await db.Department.create({
    lead: BigInt(2),
    name: "Division 1",
    sign: "D1",
  });
};

export const seedDepartment1 = async () => {
  await db.Department.create({
    lead: BigInt(1),
    name: "Division 3",
    sign: "D3",
  });
};

export const seedTimeKeeping = async () => {
  await db.Timekeeping.create({
    user_id: BigInt(1),
    create_at: moment(new Date()).format("YYYY-MM-DD"),
    check_in: new Date(),
    check_out: null,
  });
};
