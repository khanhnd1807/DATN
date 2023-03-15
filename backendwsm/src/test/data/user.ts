import moment from "moment";

export const user = () => {
  return {
    firstname: "admin one",
    lastname: "admin one",
    avatar: "",
    gender: true,
    birthday: moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD"),
    phone_number: "0862041662",
    address: "Hà Nội",
  };
};

export const member = () => {
  return {
    ...user(),
    join_company: moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD"),
    becoming_offcial_employee: moment("2022-11-15T04:15:15.112Z").format(
      "YYYY-MM-DD"
    ),
    department_id: 1,
    holidays: 0,
  };
};
