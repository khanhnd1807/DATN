import { Field } from "formik";

export const FieldGender = () => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">
        Giới tính
      </label>
      <div
        role="group"
        className="edit-member_body_item1_form-group_panel_radio"
        aria-labelledby="my-radio-group"
      >
        <label className="gender-radio">
          <Field
            type="radio"
            className="gender-radio-input"
            name="gender"
            value={"false"}
          />
          Nữ
        </label>
        <label className="gender-radio-male">
          <Field
            type="radio"
            className="gender-radio-input"
            name="gender"
            value={"true"}
          />
          Nam
        </label>
      </div>
    </div>
  );
};
