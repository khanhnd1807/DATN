const jwt = require("jsonwebtoken");
import { CustomError } from "../middlewares/errorHandler";
import { Response, Request } from "express";
import "express-async-errors";
const { SECRET_KEY = "test", EXPIRED_TOKEN = "5d" } = process.env;
export const verifyToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { token, refreshtoken } = req.cookies;

  if (!token) {
    throw new CustomError(404, "not found access token ");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    const decodedRf = jwt.verify(refreshtoken, SECRET_KEY);
    if (decodedRf) {
      const accessToken = jwt.sign(
        {
          department_id: decodedRf.department_id,
          user_id: decodedRf.user_id,
          role: decodedRf.role_position,
        },
        SECRET_KEY,
        {
          expiresIn: EXPIRED_TOKEN,
        }
      );
      try {
        res.cookie("token", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        req.user = decodedRf;
        next();
      } catch (e) {
        throw new CustomError(401, JSON.stringify(e));
      }
    }
  }
};
