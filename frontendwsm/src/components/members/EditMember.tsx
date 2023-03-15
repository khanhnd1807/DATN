import { useEffect, useState } from "react";
import { Formik } from "formik";
import { RootState, useAppDispatch } from "../../redux/store";
import { editMember } from "../../redux/slices/Profile.slice";
import { useSelector } from "react-redux";
import { upload } from "../../redux/slices/Upload.slice";
import { useParams } from "react-router-dom";
import UserAttributes from "../../interfaces/User";
import { initialValue, validateMember } from "./ValidateMember";
import { getDepartments } from "../../redux/slices/Departments.slice";
import { FormMember } from "../common/form/FormMember";
import { getInfoMember } from "src/redux/slices/Member.slice";

export const EditMember: React.FC = () => {
  const { user_id } = useParams();
  const infoMember = useSelector(
    (state: RootState) => state.memberReducers.member
  );
  const path = useSelector((state: RootState) => state.uploadReducers.path);
  const dispatch = useAppDispatch();
  const [filePicture, setFilePicture] = useState(null);
  const [picture, setPicture] = useState<string>("");
  const [imgData, setImgData] = useState<any>(null);
  const [dataForm, setDataForm] = useState<any>({});

  const [member, setMember] = useState<UserAttributes["user"]>({
    user_id: BigInt(0),
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    gender: true,
    birthday: new Date(),
    phone_number: "",
    address: "",
    password: "",
    becoming_offcial_employee: new Date(),
    join_company: new Date(),
    holidays: 0,
    department_id: BigInt(0),
    role_position: 0,
  });
  const [departmentId, setDepartmentId] = useState<bigint>(BigInt(0));
  const [rolePosition, setRolePosition] = useState<number>(0);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getInfoMember(BigInt(user_id!)));
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  useEffect(() => {
    if (dataForm.gender !== undefined && path !== undefined) {
      dispatch(
        editMember({
          ...dataForm,
          gender: JSON.parse(dataForm.gender),
          avatar: path,
          user_id: member.user_id,
          join_company: member.join_company,
        })
      );
    }

    setMember({ ...infoMember });
    setDepartmentId(infoMember.department_id);
    setRolePosition(infoMember.role_position!);
  }, [path, infoMember]);

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
    if (department_id != departmentId && member.role_position! < 2) {
      setMember({
        ...member,
        department_id: department_id,
        role_position: 0, // set ve trang thai nhan vien
      });
    } else {
      setMember({
        ...member,
        department_id: department_id,
        role_position: rolePosition, // set ve trang thai nhan vien
      });
    }
  };

  return (
    <>
      {showComponent && (
        <Formik
          enableReinitialize
          initialValues={initialValue(member)}
          onSubmit={(value) => {
            if (validateMember(value) === true) {
              if (filePicture != null) {
                setDataForm({ ...value });
                const formData = new FormData();
                formData.append("avatar", filePicture);
                dispatch(upload(formData));
              } else {
                dispatch(
                  editMember({
                    ...value,
                    gender: JSON.parse(value.gender),
                    avatar: member.avatar,
                    user_id: member.user_id,
                    join_company: new Date(value.join_company) || new Date(),
                    birthday: new Date(value.birthday),
                    becoming_offcial_employee:
                      new Date(value.becoming_offcial_employee!) || new Date(),
                  })
                );
              }
            }
          }}
        >
          {() => (
            <FormMember
              check={2}
              imgData={imgData}
              member={member}
              uploadImage={uploadImage}
              selectDepartment={selectDepartment}
            />
          )}
        </Formik>
      )}
    </>
  );
};
