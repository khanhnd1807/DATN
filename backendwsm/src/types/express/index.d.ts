import UserAttributes from "../../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user: UserAttributes;
    }
  }
}
export {};
