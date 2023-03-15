import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { HeaderComponentNotHolidays } from "../common/HeaderComponent";
import { TableAssets, TableInforUser, TableLeader } from "./TableProfile";

export default function DetailInfoUser() {
  const data = useSelector((state: RootState) => state.userReducers.profile);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="detail-info-user">
      <HeaderComponentNotHolidays title="Thông tin cá nhân" />
      <div className="detail-info-user_body">
        <div className="detail-info-user_body_click">
          <button
            className="detail-info-user_body_click_button"
            onClick={() => {
              handleClick();
            }}
          >
            <ModeIcon className="detail-info-user_body_click_button_icon" />
          </button>
        </div>

        <div className="detail-info-user_body_tables">
          <div className="panel1">
            <p>Thông tin nhân viên</p>
            <TableInforUser data={data} />
          </div>
          <div className="panel2">
            <p>Tài sản đang sử dụng</p>
            <TableAssets />

            <p>Nhóm dự án</p>
            <TableLeader data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
