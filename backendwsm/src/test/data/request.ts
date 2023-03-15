import moment from "moment";

export const createRequest = () => {
  return {
    detail: "Làm thêm giờ",
    phone_number: "0862041663",
    time_start: moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD HH:MM"),
    time_end: moment("2022-11-15T04:15:15.112Z").format("YYYY-MM-DD HH:MM"),
    description: "hehehe",
  };
};
