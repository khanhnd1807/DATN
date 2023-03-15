import { displayError } from "../../middlewares/handlerError";
import { DepartmentAttributes } from "../../interfaces/Department";

export const initialValue = (department: DepartmentAttributes) => {
  return {
    name: department.name,
    sign: department.sign,
    lead: department.lead
  };
};

interface valueForm {
  name: string;
  sign: string;
  lead: bigint;
}
export const validateValue = (value: valueForm) => {
  if (!value.name) {
    displayError("name is empty");
  } else if (!value.sign) {
    displayError("sign is empty");
  } else return true;
};

export interface AddDepartment {
  name: string;
  lead_name: string;
  sign: string;
}

export const validateAddDepartment = (value: AddDepartment) => {
  if (!value.name) {
    displayError("name is empty");
  } else if (!value.sign) {
    displayError("sign is empty");
  } else return true;
};
