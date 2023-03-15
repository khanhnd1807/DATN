import departmentServices from "../services/departmentServices";
import { Response, Request } from "express";
import { CustomError } from "../middlewares/errorHandler";
import DepartmentAttributes from "../interfaces/department";

const getListDepartment = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const departments = await departmentServices.getListDepartment(req.body);

  if (!departments) {
    throw new CustomError(404, "get list department fail");
  }

  res.status(200).send(
    departments.sort((a: DepartmentAttributes, b: DepartmentAttributes) => {
      return a.name.localeCompare(b.name);
    })
  );
};

const addDepartment = async (req: Request, res: Response, next: Function) => {
  const department = await departmentServices.addDepartment(req.body);
  if (!department) {
    throw new CustomError(400, "create department fail.");
  }
  return res.status(200).send("create new Department successfully");
};

const updateDepartment = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const department = await departmentServices.updateDepartment(
    BigInt(req.params.department_id),
    req.body
  );
  if (department) {
    return res.status(200).send(department);
  } else {
    throw new CustomError(500, "update department fail.");
  }
};

const deleteDepartment = async (
  req: Request,
  res: Response,
  next: Function
) => {
  await departmentServices.deleteDepartment(BigInt(req.params.department_id));
  return res.status(200).send("Delete successfully!");
};

const getDepartment = async (req: Request, res: Response, next: Function) => {
  const department = await departmentServices.getDepartmentById(
    BigInt(req.params.id)
  );
  if (!department) {
    throw new CustomError(404, " not found this department");
  }
  return res.status(200).send(department);
};

const departmentControllers = {
  getListDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
};
export default departmentControllers;
