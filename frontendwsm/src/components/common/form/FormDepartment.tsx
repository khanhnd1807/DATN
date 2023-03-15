import { Form } from "formik";
import { HeaderComponentNotHolidays } from "../HeaderComponent";
import { FieldInput } from "./FieldInput";
import { ButtonSubmit } from "./ButtonForm";
import { SelectLeaderDepartment } from "./FieldSelect";
export const FormDepartment = ({
  isAdd,
  leadId,
  setLeader,
}: {
  isAdd: boolean;
  leadId?: bigint;
  setLeader?: Function;
}) => {
  return (
    <Form className="edit-member">
      <HeaderComponentNotHolidays title="Thêm phòng ban" />

      <div className="edit-member_body">
        <div className="edit-member_body_item1">
          <FieldInput
            type="text"
            name="name"
            title="Tên"
            placeholder="Tên phòng ban"
          />

          <FieldInput
            type="text"
            name="sign"
            title="Tên viết tắt"
            placeholder="Tên viết tắt"
          />

          {isAdd === true ? (
            <FieldInput
              type="text"
              name="lead_name"
              title="Leader"
              readOnly={true}
            />
          ) : (
            <SelectLeaderDepartment setLeader={setLeader!} leadId={leadId!} />
          )}

          <div className="edit-member_body_item1_form-group">
            <div className="edit-member_body_item1_form-group_panel">
              <ButtonSubmit />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
