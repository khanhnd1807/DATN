import SaveIcon from "@mui/icons-material/Save";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
export const ButtonSubmit = () => {
  return (
    <button
      className="edit-member_body_item1_form-group_panel_btn-save"
      type="submit"
    >
      <SaveIcon />
      Lưu
    </button>
  );
};

export const ButtonDelete = ({
  ModalCaution,
  id,
}: {
  ModalCaution: Function;
  id: bigint;
}) => {
  return (
    <button
      type="button"
      className="edit-member_body_item1_form-group_panel_btn-delete"
      onClick={() => {
        ModalCaution(id);
      }}
    >
      <PersonRemoveIcon />
      Xoá
    </button>
  );
};
