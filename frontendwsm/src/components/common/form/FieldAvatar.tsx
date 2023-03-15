import UserAttributes from "src/interfaces/User";
import { Field } from "formik";

export const FieldAvatar = ({
  imgData,
  member,
  uploadImage,
}: {
  imgData: any;
  member: UserAttributes["user"];
  uploadImage: Function;
}) => {
  const { REACT_APP_BACKEND_APP = "http://be.wsm.zinza.com" } = process.env;
  return (
    <div className="edit-member_body_item1_form-group">
      <label className="edit-member_body_item1_form-group_label">Avatar</label>
      <div className="edit-member_body_item1_form-group_panel_avatar">
        <div className="edit-member_body_item1_form-group_panel_image">
          <p
            className={
              imgData == null && member?.avatar == undefined ? "" : "hidden"
            }
          >
            No image
          </p>
          <img
            className={
              imgData == null && member?.avatar == undefined
                ? "hidden"
                : "edit-member_body_item1_form-group_panel_image_display"
            }
            src={
              imgData != null
                ? imgData
                : member?.avatar === ""
                ? "/user.png"
                : `${REACT_APP_BACKEND_APP}/${member.avatar}`
            }
          />
        </div>
        <Field
          type="file"
          name="avatar"
          accept="image/*"
          className="edit-member_body_item1_form-group_panel_input_image"
          onChange={(e: object) => {
            uploadImage(e);
          }}
        />
      </div>
    </div>
  );
};
