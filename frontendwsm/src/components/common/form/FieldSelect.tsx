import { Select, Switch } from "antd";
import { Field } from "formik";
import SelectLeader from "src/components/departments/SelectLeader";
import SelectDepartments from "src/components/members/SelectDepartments";
import { DepartmentAttributes } from "src/interfaces/Department";
import RequestAttributes from "src/interfaces/Request";

export const SelectDepartment = ({
  role_position,
  department_id,
  selectDepartment,
}: {
  role_position?: number;
  department_id: bigint;
  selectDepartment: Function;
}) => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">Bộ phận</label>
      <div className="edit-member_body_item1_form-group_panel">
        <SelectDepartments
          role_position={role_position!}
          department_id={department_id}
          selectDepartment={selectDepartment}
        />
      </div>
    </div>
  );
};

export const SelectFormik = ({
  detail,
  name,
  title,
}: {
  detail: any;
  name: string;
  title: string;
}) => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">{title}</label>
      <div className="edit-member_body_item1_form-group_panel">
        <Field
          as="select"
          className="edit-member_body_item1_form-group_panel_select"
          name={name}
        >
          {detail}
        </Field>
      </div>
    </div>
  );
};

export const SelectLeaderDepartment = ({
  setLeader,
  leadId,
}: {
  setLeader: Function;
  leadId: bigint;
}) => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">Leader</label>
      <div className="edit-member_body_item1_form-group_panel">
        <SelectLeader setLeader={setLeader} leader={leadId} />
      </div>
    </div>
  );
};

export const SelectContentRequest = ({
  isAdd,
  contentOfRequest,
  request,
  setContentOfRequest,
  setRequest,
  contents,
}: {
  isAdd: boolean;
  contentOfRequest: string;
  request: RequestAttributes;
  setContentOfRequest: Function;
  setRequest: Function;
  contents: string[];
}) => {
  return (
    <div className="create-request_body_item1_form-group">
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
    </div>
  );
};
