import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { validateRequest } from "./validateRequest";
import { time } from "../../interfaces/Time";
import { createRequest } from "../../redux/slices/Requests.slice";
import { FormRequest } from "../common/form/FormRequest";
import { contents } from "./ContentRequest";

registerLocale("vi", vi);

export const CreateRequest = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(
    (state: RootState) => state.userReducers.profile.user
  );

  const [state, setState] = useState<time>({
    startDate: new Date(),
    toDate: new Date(),
  });

  const handleChangeStartDate = (date: Date) => {
    setState({
      startDate: date,
      toDate: new Date(),
    });
  };

  const handleChangeToDate = (date: Date) => {
    setState({
      toDate: date,
      startDate: state.startDate,
    });
  };

  const [contentRequest, setContentRequest] = useState(contents[0]);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        detail: contentRequest,
        time_start: state.startDate,
        time_end: state.toDate,
        phone_number: user.phone_number,
        description: "",
      }}
      onSubmit={(value) => {
        validateRequest(value);
        dispatch(createRequest(value));
      }}
    >
      {() => (
        <FormRequest
          user={user}
          handleChangeStartDate={handleChangeStartDate}
          handleChangeToDate={handleChangeToDate}
          contentOfRequest={contentRequest}
          setContentOfRequest={setContentRequest}
          state={state}
          setState={setState}
          isAdd={true}
        />
      )}
    </Formik>
  );
};
