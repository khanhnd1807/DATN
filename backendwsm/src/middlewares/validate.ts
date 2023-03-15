import { body, check, param } from "express-validator";
const filter = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i;
const regex_phone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
const filterEmail = /^([a-zA-Z0-9_\.\-])+\@zinza.com.vn/g;

const validateEmail = () => {
  return [
    body("email")
      .matches(filterEmail)
      .withMessage("you have to use email of Zinza"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password atleast 5 characters"),
  ];
};

const validateCreateUser = () => {
  return [
    body("firstname")
      .matches(filter)
      .withMessage("firstname invalid"),
    body("lastname")
      .matches(filter)
      .withMessage("lastname invalid"),
    body("email")
      .matches(filterEmail)
      .withMessage("you have to use email of Zinza"),
    body("gender", "gender invalid").isBoolean(),
    body("birthday")
      .isISO8601()
      .withMessage("birthday invalid"),
    body("phone_number")
      .matches(regex_phone)
      .withMessage("phone number invalid"),
    body("address", "address invalid").notEmpty(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password atleast 5 characters"),
    body("becoming_offcial_employee")
      .isISO8601()
      .withMessage("Date of joining company invalid")
      .optional({ nullable: true }),
    body("join_company")
      .isISO8601()
      .withMessage("Date of joining company invalid"),
    body("holidays")
      .isNumeric()
      .withMessage("holidays invalid")
      .isIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
      .withMessage("holidays invalid"),
    body("department_id", "department_id invalid").isNumeric(),
  ];
};

const validateEditMember = () => {
  return [
    body("firstname")
      .matches(filter)
      .withMessage("firstname invalid"),
    body("lastname")
      .matches(filter)
      .withMessage("lastname invalid"),
    body("gender", "gender invalid").isBoolean(),
    body("birthday")
      .isISO8601()
      .withMessage("birthday invalid"),
    body("phone_number")
      .matches(regex_phone)
      .withMessage("phone number invalid"),
    body("address", "address invalid").notEmpty(),
    body("becoming_offcial_employee").optional({ nullable: true }),
    body("join_company")
      .isISO8601()
      .withMessage("Date of joining company invalid"),
    body("holidays")
      .isNumeric()
      .withMessage("holidays invalid")
      .isIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
      .withMessage("holidays invalid"),
    body("department_id", "department_id invalid").isNumeric(),
  ];
};

const validateEditProfile = () => {
  return [
    body("firstname")
      .matches(filter)
      .withMessage("firstname invalid"),

    body("lastname")
      .matches(filter)
      .withMessage("lastname invalid"),
    body("gender", "gender invalid").isBoolean(),
    body("birthday")
      .isISO8601()
      .withMessage("birthday invalid"),
    body("phone_number")
      .matches(regex_phone)
      .withMessage("phone number invalid"),
    body("address", "address invalid").notEmpty(),
  ];
};

const validateDepartment = () => {
  return [
    body("name", "name of department is not empty").notEmpty(),
    body("sign", "sign of department is not empty").notEmpty(),
  ];
};

const validateEditDepartment = () => {
  return [
    body("name", "name of department is not empty").notEmpty(),
    body("sign", "sign of department is not empty").notEmpty(),
    body("lead", "lead of department invalid").isNumeric(),
  ];
};

const validateRequest = () => {
  return [
    body("detail", "detail is empty").notEmpty(),
    body("time_start", "time_start invalid").isISO8601(),
    body("time_end", "time_end invalid").isISO8601(),
    body("phone_number")
      .matches(regex_phone)
      .withMessage("phone number invalid"),
    body("description", "description is not empty").notEmpty(),
  ];
};

const validateTimeKeeping = () => {
  return [
    body("user_id", "user_id invalid").isNumeric(),
    body("create_at", "create_at invalid").isISO8601(),
    body("check_in", "check_in invalid").isISO8601(),
    body("check_out", "check_out invalid").isISO8601(),
  ];
};

export interface validateError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

const getMessageError = (errorsValidate: any) => {
  let message: string[] = [];
  errorsValidate.errors.map((err: validateError) => {
    message.push(err.msg);
  });
  return message.join(",");
};

const validateGetProcessedRequests = () => {
  return [
    param("status")
      .isIn([1, 2])
      .withMessage(
        "status is invalid, you only get processed requests were accepted with status 1 or processed requests were rejected with status 2"
      ),
  ];
};
const validate = {
  validateDepartment,
  validateEditDepartment,
  validateEmail,
  validateRequest,
  validateTimeKeeping,
  validateCreateUser,
  validateEditProfile,
  getMessageError,
  validateGetProcessedRequests,
  validateEditMember,
};

export default validate;
