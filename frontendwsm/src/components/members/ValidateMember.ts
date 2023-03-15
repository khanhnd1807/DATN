import moment from "moment";
import UserAttributes from "../../interfaces/User";
import { email_filter, filter } from "../../util/constants";
import { regex_phone } from "../../util/constants";
import { displayError } from "../../middlewares/handlerError";

export const initialValue = (member: UserAttributes["user"]) => {
  return {
    firstname: member.firstname,
    lastname: member.lastname,
    avatar: null,
    gender: JSON.stringify(member.gender),
    birthday: moment(member.birthday).format("YYYY-MM-DD"),
    phone_number: member.phone_number,
    address: member.address,
    department_id: Number(member.department_id),
    join_company: moment(member.join_company).format("YYYY-MM-DD"),
    becoming_offcial_employee: moment(member.becoming_offcial_employee).format("YYYY-MM-DD"),
    role_position: member.role_position,
    holidays: member.holidays
  };
};

export const initialSignUp = (department_id: bigint) => {
  return {
    firstname: "",
    lastname: "",
    email: "",
    avatar: null,
    gender: JSON.stringify(true),
    birthday: "",
    phone_number: "",
    address: "",
    department_id: department_id,
    join_company: "",
    becoming_offcial_employee: "",
    role_position: 0,
    holidays: 0,
    password: "",
    confirm_password: ""
  };
};

export const validateMember = (value: any) => {
  if (!value.address) {
    displayError("address is empty");
  } else if (!value.firstname) {
    displayError("firstname is empty");
  } else if (!value.lastname) {
    displayError("lastname is empty");
  } else if (value.birthday === "") {
    displayError("birthday is empty");
  } else if (value.becoming_offcial_employee === "") {
    displayError("becoming official employee is empty");
  } else if (!value.phone_number) {
    displayError("phone number is empty");
  } else if (!filter.test(value.firstname) || !filter.test(value.lastname)) {
    displayError("first name of last name incorrect");
  } else if (!regex_phone.test(value.phone_number)) {
    displayError("phone number incorrect");
  } else if (value.holidays > 12 || value.holidays < 0) {
    displayError("value of holidays incorrect");
  } else return true;
};

export const validateSignUp = (value: any) => {
  if (!value.address) {
    displayError(" address is empty");
  } else if (!value.email) {
    displayError(" email is empty");
  } else if (!value.firstname) {
    displayError(" firstname is empty");
  } else if (!value.lastname) {
    displayError(" lastname is empty");
  } else if (value.birthday === "") {
    displayError(" birthday is empty");
  } else if (value.join_company === "") {
    displayError(" date of join company is empty");
  } else if (value.holidays === "") {
    displayError(" holidays is empty");
  } else if (!value.phone_number) {
    displayError("  phone number is empty");
  } else if (!value.password) {
    displayError(" password is empty");
  } else if (!value.confirm_password) {
    displayError(" confirm password is empty");
  } else if (!filter.test(value.firstname) || !filter.test(value.lastname)) {
    displayError("first name of last name incorrect");
  } else if (!email_filter.test(value.email)) {
    displayError("you must use email of Zinza");
  } else if (!regex_phone.test(value.phone_number)) {
    displayError("phone number incorrect");
  } else if (value.holidays > 12 || value.holidays < 0) {
    displayError("value of holidays incorrect");
  } else if (value.password.length < 6) {
    displayError("password at least 6 character");
  } else if (value.password !== value.confirm_password) {
    displayError("password doesn't match");
  } else return true;
};
