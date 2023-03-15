import { useEffect, useState } from "react";
import { Formik } from "formik";
import { RootState, useAppDispatch } from "../../redux/store";
import { signUpMember } from "../../redux/slices/Profile.slice";
import { useSelector } from "react-redux";
import { upload } from "../../redux/slices/Upload.slice";
import { initialSignUp, validateSignUp } from "./ValidateMember";
import { getDepartments } from "../../redux/slices/Departments.slice";
import { FormMember } from "../common/form/FormMember";

export const SignUp: React.FC = () => {
  const path = useSelector((state: RootState) => state.uploadReducers.path);
  const dispatch = useAppDispatch();
  const [filePicture, setFilePicture] = useState(null);
  const [picture, setPicture] = useState<string>("");
  const [imgData, setImgData] = useState<any>(null);
  const [dataForm, setDataForm] = useState<any>({});

  useEffect(() => {
    dispatch(getDepartments());
  }, []);
  const [departmentId, setDepartmentId] = useState(BigInt(0));
  const departments = useSelector(
    (state: RootState) => state.departmentsReducers.departments
  );

  useEffect(() => {
    if (dataForm.gender !== undefined && path !== undefined) {
      dispatch(
        signUpMember({
          ...dataForm,
          gender: JSON.parse(dataForm.gender),
          avatar: path,
          join_company: new Date(dataForm.join_company) || new Date(),
          birthday: new Date(dataForm.birthday),
          becoming_offcial_employee:
            new Date(dataForm.becoming_offcial_employee!) || null,
        })
      );
    }
    setDepartmentId(departments[0] ? departments[0].department_id : BigInt(0));
  }, [path, departments]);

  const uploadImage = (e: any) => {
    setFilePicture(e.target.files[0]);
    setPicture(e.target.value);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const selectDepartment = (department_id: bigint) => {
    setDepartmentId(department_id);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialSignUp(
        departments[0] ? departments[0].department_id : BigInt(0)
      )}
      onSubmit={(value) => {
        if (validateSignUp(value) === true) {
          if (filePicture != null) {
            setDataForm({ ...value, department_id: departmentId });
            const formData = new FormData();
            formData.append("avatar", filePicture);
            dispatch(upload(formData));
          } else {
            dispatch(
              signUpMember({
                ...value,
                department_id: departmentId,
                gender: JSON.parse(value.gender),
                avatar: null,
                join_company: new Date(value.join_company) || new Date(),
                birthday: new Date(value.birthday),
                becoming_offcial_employee:
                  new Date(value.becoming_offcial_employee!) || null,
              })
            );
          }
        }
      }}
    >
      {() => (
        <FormMember
          check={0}
          imgData={imgData}
          member={dataForm}
          uploadImage={uploadImage}
          departments={departments}
          selectDepartment={selectDepartment}
          department_id={departmentId}
        />
      )}
    </Formik>
  );
};
