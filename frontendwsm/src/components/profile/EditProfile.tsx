import { useEffect, useState } from "react";
import { Formik } from "formik";
import { RootState, useAppDispatch } from "../../redux/store";
import { editProfile, getInfoUser } from "../../redux/slices/Profile.slice";
import { useSelector } from "react-redux";
import { upload } from "../../redux/slices/Upload.slice";
import { validateProfile } from "./validateProfile";
import { initialValues } from "./validateProfile";
import { FormMember } from "../common/form/FormMember";

export const EditInfoUser: React.FC = () => {
  const data = useSelector((state: RootState) => state.userReducers.profile);
  const path = useSelector((state: RootState) => state.uploadReducers.path);
  const dispatch = useAppDispatch();
  const [filePicture, setFilePicture] = useState(null);
  const [picture, setPicture] = useState<string>("");
  const [imgData, setImgData] = useState<any>(null);
  const [dataForm, setDataForm] = useState<any>({});

  useEffect(() => {
    if (dataForm.gender !== undefined) {
      dispatch(
        editProfile({
          ...dataForm,
          gender: JSON.parse(dataForm.gender),
          avatar: path,
          join_company: data.user.join_company,
        })
      );
    }
  }, [path]);

  useEffect(() => {
    dispatch(getInfoUser());
  }, []);

  const uploadImage = (e: any) => {
    setFilePicture(e.target.files[0]);
    setPicture(e.target.value);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues(data)}
      onSubmit={(value) => {
        if (validateProfile(value) === true) {
          if (filePicture != null) {
            setDataForm({ ...value });
            const formData = new FormData();
            formData.append("avatar", filePicture);
            dispatch(upload(formData));
          } else {
            dispatch(
              editProfile({
                ...value,
                gender: JSON.parse(value.gender),
                avatar: data.user.avatar,
                birthday: new Date(value.birthday),
              })
            );
          }
        }
      }}
    >
      {() => (
        <FormMember
          check={1}
          imgData={imgData}
          member={data.user}
          uploadImage={uploadImage}
        />
      )}
    </Formik>
  );
};
