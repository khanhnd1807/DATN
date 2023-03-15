import jwt from "jsonwebtoken";
import UserAttributes from "../interfaces/user";
const {
  SECRET_KEY = "iloveyou",
  EXPIRED_TOKEN = "5d",
  EXPIRED_REFRESHTOKEN = "30d",
} = process.env;

const createToken = (user: UserAttributes) => {
  return jwt.sign(
    {
      department_id: user.department_id,
      user_id: user.user_id,
      role_position: user.role_position,
      email: user.email
    },
    SECRET_KEY,
    {
      expiresIn: EXPIRED_TOKEN,
    }
  );
};

const crateRefreshtoken = (user: UserAttributes) => {
  return jwt.sign(
    {
      department_id: user.department_id,
      user_id: user.user_id,
      role_position: user.role_position,
      email: user.email
    },
    SECRET_KEY,
    {
      expiresIn: EXPIRED_REFRESHTOKEN,
    }
  );
};

const createUserToken = {
  createToken,
  crateRefreshtoken,
};

export default createUserToken;
