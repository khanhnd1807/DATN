import moment from "moment";
import { displayError } from "../../middlewares/handlerError";
import { regex_phone } from "../../util/constants";

export const validateRequest = (value: any) => {
  if (value.description === "") {
    displayError("the reason can not be null");
  } else if (value.detail === "") {
    displayError("detail can not be null");
  } else if (value.phone_number === "" || !regex_phone.test(value.phone_number)) {
    displayError("phone is null or invalid");
  } else if (moment(value.from_date).format("YYYY-MM_DD HH-MM") === "") {
    displayError("From date invalid");
  } else if (moment(value.to_date).format("YYYY-MM_DD HH-MM") === "") {
    displayError("To date invalid");
  } else return true;
};
