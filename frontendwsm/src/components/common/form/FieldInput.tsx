import { Field } from "formik";

export const FieldInput = ({
  title,
  name,
  type = "text",
  css = true,
  readOnly = false,
  col = 1,
  min = 0,
  max = 12,
  ...props
}: {
  title: string;
  name: string;
  type: string;
  css?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  min?: number;
  max?: number;
  col?: number;
}) => {
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">{title}</label>
      <div className="edit-member_body_item1_form-group_panel">
        <Field
          type={type}
          id={name}
          className={
            css === true
              ? "edit-member_body_item1_form-group_panel_input"
              : "edit-member_body_item1_form-group_panel_input2"
          }
          name={name}
          {...props}
          readOnly={readOnly}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

export const FieldInputRequest = ({
  type,
  name,
  as,
  title,
  placeholder,
}: {
  type: string;
  name: string;
  as?: string;
  title: string;
  placeholder?: string;
}) => {
  return (
    <div className="create-request_body_item1_form-group">
      <label className="create-request_body_item1_form-group_label">
        {title}
      </label>
      <div className="create-request_body_item1_form-group_panel">
        <Field
          type={type}
          as={as}
          className="create-request_body_item1_form-group_panel_input"
          name={name}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export const FieldReadOnly = ({
  type,
  name,
  title,
  value,
}: {
  type: string;
  name: string;
  title: string;
  value: string;
}) => {
  return (
    <div className="create-request_body_item1_form-group">
      <label className="create-request_body_item1_form-group_label">
        {title}
      </label>
      <div className="create-request_body_item1_form-group_panel">
        <Field
          type={type}
          readOnly={true}
          className="create-request_body_item1_form-group_panel_input"
          name={name}
          value={value}
        />
      </div>
    </div>
  );
};
