import { time } from "src/interfaces/Time";
import DatePicker from "react-datepicker";
import RequestAttributes from "src/interfaces/Request";

export const FieldDatePicker = ({
  isAdd = true,
  timeStart = false,
  title,
  handleChangeToDate,
  setState,
  state,
  handleChangeStartDate,
  request,
}: {
  isAdd?: boolean;
  timeStart?: boolean;
  title: string;
  handleChangeToDate?: Function;
  handleChangeStartDate?: Function;
  setState: Function;
  state: time;
  request: RequestAttributes;
}) => {
  return (
    <div className="create-request_body_item1_form-group">
      <label className="create-request_body_item1_form-group_label">
        {title}
      </label>
      <div className="create-request_body_item1_form-group_panel">
        <DatePicker
          className="create-request_body_item1_form-group_panel_date-time"
          onChange={(e) => {
            if (timeStart === false) {
              handleChangeToDate!(e);
              setState({ ...state, toDate: e! });
            } else {
              handleChangeStartDate!(e);
              setState({ ...state, startDate: e! });
            }
          }}
          selected={
            //  isAdd
            // ?
            timeStart ? state.startDate : state.toDate
            //  : timeStart
            //  ? request.time_start
            // : request.time_end
          }
          showTimeSelect
          dateFormat="MM/dd/yyyy HH:mm"
          locale={"vi"}
          name="time_end"
        />
      </div>
    </div>
  );
};
