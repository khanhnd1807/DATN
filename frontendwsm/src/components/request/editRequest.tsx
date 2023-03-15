import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { validateRequest } from "./validateRequest";
import { time } from "../../interfaces/Time";
import { editRequest } from "../../redux/slices/Requests.slice";
import { useParams } from "react-router-dom";
import RequestAttributes from "../../interfaces/Request";
import { FormRequest } from "../common/form/FormRequest";
import { getRequest } from "src/redux/slices/Request.slice";

registerLocale("vi", vi);

export const EditRequest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useSelector(
    (state: RootState) => state.userReducers.profile.user
  );

  const userRequest = useSelector(
    (state: RootState) => state.requestReducers.request
  );

  const [request, setRequest] = useState<RequestAttributes>({
    detail: "",
    time_start: new Date(),
    time_end: new Date(),
    phone_number: "",
    description: "",
  });

  useEffect(() => {
    setRequest(userRequest);
    setState({
      toDate: new Date(userRequest.time_end),
      startDate: new Date(userRequest.time_start),
    });
  }, [userRequest]);

  useEffect(() => {
    dispatch(getRequest(BigInt(id!)));
  }, []);

  const [state, setState] = useState<time>({
    startDate: new Date(),
    toDate: new Date(),
  });

  const handleChangeStartDate = (date: Date) => {
    setState({
      startDate: date,
      toDate: state.toDate,
    });
  };

  const handleChangeToDate = (date: Date) => {
    setState({
      toDate: date,
      startDate: state.startDate,
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        detail: request.detail,
        time_start: state.startDate,
        time_end: state.toDate,
        phone_number: request.phone_number,
        description: request.description,
      }}
      onSubmit={(value) => {
        validateRequest(value);
        dispatch(editRequest({ ...value, request_id: BigInt(id!) }));
      }}
    >
      {() => (
        <FormRequest
          user={user}
          handleChangeStartDate={handleChangeStartDate}
          handleChangeToDate={handleChangeToDate}
          request={request}
          state={state}
          setState={setState}
          setRequest={setRequest}
        />
      )}
    </Formik>
  );
};
