import { Field } from "formik";

export const FieldRole = ({ role_position }: { role_position: number }) => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">Chức vụ</label>
      <div className="edit-member_body_item1_form-group_panel">
        <Field
          type="text"
          className="edit-member_body_item1_form-group_panel_select"
          name="role_position"
          readOnly={true}
          value={
            role_position === 0
              ? "Nhân viên"
              : role_position === 1
              ? "Trưởng phòng"
              : "Admin"
          }
        />
      </div>
    </div>
  );
};
