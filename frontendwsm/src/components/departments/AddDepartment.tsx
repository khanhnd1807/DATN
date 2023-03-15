import { useEffect, useState } from "react";
import { Formik } from "formik";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AddDepartment } from "./ValidateFormDepartment";
import { getMembers } from "../../redux/slices/Members.slice";
import { validateAddDepartment } from "./ValidateFormDepartment";
import { addDepartments } from "../../redux/slices/Departments.slice";
import { FormDepartment } from "../common/form/FormDepartment";

export const AddaDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const members = useSelector(
    (state: RootState) => state.membersReducers.users
  );
  const [idAdmin, getIdAdmin] = useState<bigint>(BigInt(0));

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  useEffect(() => {
    members.map((member) => {
      if (member.role_position === 2) {
        setDepartment({
          ...department,
          lead_name: member.lastname + " " + member.firstname,
        });
        getIdAdmin(member.user_id);
      }
    });
  }, [members]);

  const [department, setDepartment] = useState<AddDepartment>({
    name: "",
    sign: "",
    lead_name: "",
  });

  return (
    <Formik
      enableReinitialize
      initialValues={department}
      onSubmit={(value) => {
        if (validateAddDepartment(value) === true) {
          dispatch(
            addDepartments({
              name: value.name,
              sign: value.sign,
              lead: idAdmin,
            })
          );
        }
      }}
    >
      {() => <FormDepartment isAdd={true} />}
    </Formik>
  );
};
