import userServices from "../services/userServices";
import { CustomError } from "../middlewares/errorHandler";
import { Request, Response } from "express";
import UserAttributes from "../interfaces/user";

const Login = async (req: Request, res: Response, next: Function) => {
  const user = await userServices.Login(req.body);
  res.cookie("token", user.jwtToken.token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  res.cookie("refreshtoken", user.jwtToken.refreshtoken, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  res.status(200).send({ user: user.infoUser });
};

const logout = (req: Request, res: Response, next: Function) => {
  const message = userServices.logout();
  res.clearCookie("token");
  res.clearCookie("refreshtoken");
  res.status(200).json({
    message: message,
  });
};
const SignUp = async (req: Request, res: Response, next: Function) => {
  const user = await userServices.SignUp(req.body);
  if (user) {
    return res.status(200).send(user);
  } else {
    throw new CustomError(500, "create account fail.");
  }
};

const getInfoUser = async (req: Request, res: Response, next: Function) => {
  const user = await userServices.getInfoUser(req.user);
  if (!user && req.user.role_position === 2) {
    throw new CustomError(404, "not found this account");
  } else if (!user && req.user.role_position < 2) {
    throw new CustomError(404, "you are deleted");
  }

  const admin = await userServices.getAdmin();
  const leadDepartment = await userServices.getLeadDepartment(
    user.Department.lead
  );
  res.status(200).json({
    mailAdmin: admin.email,
    leadName:
      leadDepartment && leadDepartment.user_id !== admin.user_id
        ? leadDepartment.lastname + " " + leadDepartment.firstname
        : "",
    adminName: admin ? admin.lastname + " " + admin.firstname : "",
    user,
  });
};

const updateInfoUser = async (req: Request, res: Response, next: Function) => {
  const user = await userServices.updateInfoUser(req.body, req.user.user_id);
  if (user) {
    const admin = await userServices.getAdmin();
    const leadDepartment = await userServices.getLeadDepartment(
      user.Department.lead
    );
    res.status(200).json({
      mailAdmin: admin.email,
      leadName:
        leadDepartment !== null
          ? leadDepartment.lastname + " " + leadDepartment.firstname
          : "",
      adminName: admin ? admin.lastname + " " + admin.firstname : "",
      user,
    });
  } else {
    throw new CustomError(404, " not found this account");
  }
};

const updateInfoMember = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const user = await userServices.updateInfoMember(
    req.body,
    BigInt(req.params.id)
  );
  if (user) {
    res.status(200).json(user);
  } else {
    throw new CustomError(404, " not found this account");
  }
};

const deleteUser = async (req: Request, res: Response, next: Function) => {
  await userServices.deleteUser(BigInt(req.params.id));
  res.status(200).send("Delete successfully!");
};

const getAllUser = async (req: Request, res: Response, next: Function) => {
  const users = await userServices.getAllUsers();
  if (users) {
    return res.status(200).json(
      users.sort((a: UserAttributes, b: UserAttributes) => {
        return a.firstname.localeCompare(b.firstname);
      })
    );
  } else {
    throw new CustomError(400, "error, please try again");
  }
};

const getAllUserInDepartment = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const users = await userServices.getAllUsersInDepartment(
    BigInt(req.params.derpartment_id)
  );
  if (users) {
    return res.status(200).json(
      users.sort((a: UserAttributes, b: UserAttributes) => {
        return a.firstname.localeCompare(b.firstname);
      })
    );
  } else {
    throw new CustomError(400, "error, please try again");
  }
};

const getInfoMember = async (req: Request, res: Response) => {
  const member = await userServices.getInfoMember(BigInt(req.params.id));
  if (!member) {
    throw new CustomError(404, "not found this member");
  }
  res.status(200).send(member);
};

const userController = {
  Login,
  SignUp,
  getInfoUser,
  updateInfoUser,
  deleteUser,
  getAllUser,
  getAllUserInDepartment,
  logout,
  updateInfoMember,
  getInfoMember,
};
export default userController;
