import { Field } from "formik";
export const FieldInputName = () => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">Tên</label>
      <div className="edit-member_body_item1_form-group_panel-name">
        <Field
          className="edit-member_body_item1_form-group_panel_input"
          placeholder="Họ đệm..."
          name="lastname"
        />
        <Field
          className="edit-member_body_item1_form-group_panel_input"
          placeholder="Tên..."
          name="firstname"
        />
      </div>
    </div>
  );
};
