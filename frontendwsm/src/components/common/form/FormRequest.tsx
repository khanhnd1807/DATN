import UserAttributes from "src/interfaces/User";
import { Form } from "formik";
import { contents } from "../../request/ContentRequest";
import { time } from "../../../interfaces/Time";
import { HeaderComponentWithHolidays } from "src/components/common/HeaderComponent";
import { SelectContentRequest } from "src/components/common/form/FieldSelect";
import {
  FieldInputRequest,
  FieldReadOnly,
} from "src/components/common/form/FieldInput";
import RequestAttributes from "src/interfaces/Request";
import { ButtonSubmit } from "src/components/common/form/ButtonForm";
import { FieldDatePicker } from "./FieldDatePicker";

export const FormRequest = ({
  user,
  handleChangeStartDate,
  handleChangeToDate,
  request,
  setRequest,
  contentOfRequest,
  state,
  setState,
  setContentOfRequest,
  isAdd = false,
}: {
  user: UserAttributes["user"];
  handleChangeStartDate: Function;
  handleChangeToDate: Function;
  request?: RequestAttributes;
  setRequest?: Function;
  state: time;
  setState: Function;
  contentOfRequest?: string;
  setContentOfRequest?: Function;
  isAdd?: boolean;
}) => {
  return (
    <Form className="create-request">
      <HeaderComponentWithHolidays
        title="Yêu cầu của tôi"
        holidays={user.holidays!}
      />

      <div className="create-request_body">
        <div className="create-request_body_item1">
          {/* <div className="create-request_body_item1_form-group">
            <label className="create-request_body_item1_form-group_label">
              Nội dung
            </label>

            <div className="create-request_body_item1_form-group_panel">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                value={isAdd ? contentOfRequest : request?.detail}
                onChange={(content: string) => {
                  isAdd
                    ? setContentOfRequest!(content)
                    : setRequest!({ ...request, detail: content });
                }}
                options={contents.map((content: string) => {
                  return {
                    value: content,
                    label: content,
                  };
                })}
              />

              <div className="create-request_body_item1_form-group_panel_request-recop">
                <Switch
                  size="small"
                  className="create-request_body_item1_form-group_panel_request-recop_toggle"
                />
                <span>Tạo request bù</span>
              </div>
            </div>
          </div> */}

          <SelectContentRequest
            isAdd={isAdd}
            contentOfRequest={contentOfRequest!}
            request={request!}
            setContentOfRequest={setContentOfRequest!}
            setRequest={setRequest!}
            contents={contents}
          />

          <div className="create-request_body_item1_time">
            {/* <div className="create-request_body_item1_form-group">
              <label className="create-request_body_item1_form-group_label">
                Từ
              </label>
              <div className="create-request_body_item1_form-group_panel">
                <DatePicker
                  className="create-request_body_item1_form-group_panel_date-time"
                  onChange={(e) => {
                    handleChangeStartDate(e);
                    setState({ ...state, startDate: e! });
                  }}
                  selected={state.startDate}
                  showTimeSelect
                  dateFormat="MM/dd/yyyy HH:mm"
                  locale="vi"
                  name="time_start"
                />
              </div>
            </div> */}
            <FieldDatePicker
              isAdd={isAdd}
              timeStart={true}
              title={"Từ"}
              setState={setState}
              state={state}
              request={request!}
              handleChangeStartDate={handleChangeStartDate}
            />

            <FieldDatePicker
              isAdd={isAdd}
              title={"Đến"}
              setState={setState}
              state={state}
              request={request!}
              handleChangeToDate={handleChangeToDate}
            />
          </div>

          <FieldInputRequest
            type="text"
            name="phone_number"
            title="Số điện thoại"
          />

          <FieldReadOnly
            type="text"
            name="sign"
            title="Dự án"
            value={user.Department?.sign!}
          />

          <FieldInputRequest
            type="text"
            as="textarea"
            title="Lý do"
            name="description"
            placeholder="Ghi lý do cụ thể, không ghi 'Bận việc cá nhân'."
          />

          <div className="create-request_body_item1_form-group">
            <div className="create-request_body_item1_form-group_panel">
              <ButtonSubmit />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
