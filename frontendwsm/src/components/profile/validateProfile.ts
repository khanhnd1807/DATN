import { filter } from "../../util/constants";
import { regex_phone } from "../../util/constants";
import { displayError } from "../../middlewares/handlerError";
import moment from "moment";

export const validateProfile = (data: any) => {
  if (!data.address) {
    displayError("address is empty");
  } else if (!data.firstname) {
    displayError("firstname is empty");
  } else if (!data.lastname) {
    displayError("lastname is empty");
  } else if (data.birthday === "") {
    displayError("birthday is empty");
  } else if (!data.phone_number) {
    displayError("phone number is empty");
  } else if (!filter.test(data.firstname) || !filter.test(data.lastname)) {
    displayError("first name of last name incorrect");
  } else if (!regex_phone.test(data.phone_number)) {
    displayError("phone number incorrect");
  } else return true;
};

export const initialValues = (data: any) => {
  return {
    firstname: data.user.firstname,
    lastname: data.user.lastname,
    avatar: null,
    gender: JSON.stringify(data.user.gender),
    birthday: moment(data.user.birthday).format("YYYY-MM-DD"),
    phone_number: data.user.phone_number,
    address: data.user.address,
    department_name: data.user.Department.name
  };
};
