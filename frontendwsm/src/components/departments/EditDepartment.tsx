import { useEffect, useState } from "react";
import { Formik } from "formik";
import { RootState, useAppDispatch } from "../../redux/store";

import { useSelector } from "react-redux";

import { updateDepartments } from "../../redux/slices/Departments.slice";
import { useParams } from "react-router-dom";
import { initialValue, validateValue } from "./ValidateFormDepartment";
import { DepartmentAttributes } from "../../interfaces/Department";
import { getMembersInDepartment } from "../../redux/slices/Members.slice";
import { FormDepartment } from "../common/form/FormDepartment";
import { getDepartment } from "src/redux/slices/Department.slice";

export const EditDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const { department_id } = useParams();
  const department = useSelector(
    (state: RootState) => state.departmentReducers.department
  );
  const [departmentState, setDepartmentState] = useState<DepartmentAttributes>({
    name: "",
    sign: "",
    lead: BigInt(0),
    department_id: BigInt(department_id!),
  });
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    dispatch(getDepartment(BigInt(department_id!)));
    dispatch(getMembersInDepartment(BigInt(department_id!)));
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  useEffect(() => {
    setDepartmentState({ ...department });
  }, [department]);

  const setLeader = (leader: bigint) => {
    setDepartmentState({ ...departmentState, lead: leader });
  };

  return (
    <>
      {showComponent && (
        <Formik
          enableReinitialize
          initialValues={initialValue(departmentState)}
          onSubmit={(value) => {
            if (validateValue(value) === true) {
              dispatch(
                updateDepartments({
                  ...value,
                  department_id: departmentState.department_id,
                })
              );
            }
          }}
        >
          {() => (
            <FormDepartment
              isAdd={false}
              setLeader={setLeader}
              leadId={departmentState.lead}
            />
          )}
        </Formik>
      )}
    </>
  );
};
