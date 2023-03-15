import React, { useState } from "react";
import "antd/dist/antd.min.css";
import "../../../style/style.scss";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Cookies from "js-cookie";
import { items, itemsAdmin } from "./MenuSidebar";
import { CustomScrollbars } from "./MenuSidebar";

const Sidebar: React.FC = () => {
  const { REACT_APP_BACKEND_APP = "http://be.wsm.zinza.com" } = process.env;
  const [collapsed, setCollapsed] = useState(false);
  const data = useSelector(
    (state: RootState) => state.userReducers.profile.user
  );

  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const loadComponents = (e: any) => {
    switch (e.key) {
      case "1":
        navigate("/");
        Cookies.set("key", "1");
        Cookies.set("sub", "");
        break;

      case "2":
        navigate("/user/my-request");
        Cookies.set("key", "2");
        Cookies.set("sub", "sub1");
        break;

      case "3":
        navigate("/member/requests");
        Cookies.set("key", "3");
        Cookies.set("sub", "sub1");
        Cookies.set("tab", "a");
        break;

      case "9":
        navigate("/members");
        Cookies.set("sub", "sub3");
        Cookies.set("key", "9");

        break;

      case "10":
        navigate("/members/sign-up");
        Cookies.set("sub", "sub3");
        Cookies.set("key", "10");
        break;

      case "11":
        navigate("/departments");
        Cookies.set("sub", "sub4");
        Cookies.set("key", "11");
        break;

      case "12":
        navigate("/add-department");
        Cookies.set("sub", "sub4");
        Cookies.set("key", "12");
        break;
      default:
        navigate("/");
    }
  };
  return (
    <div style={{ width: "270px", height: "100%" }}>
      <div className="logo">
        <img className="logo_img" src="/zinza.png" />
        <h3 className="logo_name">WSM</h3>
      </div>

      <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="info-user">
          <img
            className={data === undefined ? "hidden" : "info-user_user_img"}
            src={
              data.avatar !== ""
                ?REACT_APP_BACKEND_APP + "/" + data.avatar
                : "/user.png"
            }
          />

          <div>
            <h3 className="info-user_name">
              {data !== undefined ? data.lastname + " " + data.firstname : ""}
            </h3>

            <p>{data !== undefined ? data.email : ""}</p>
          </div>
        </div>

        <Menu
          defaultSelectedKeys={[Cookies.get("key") ? Cookies.get("key")! : "1"]}
          defaultOpenKeys={[Cookies.get("sub") ? Cookies.get("sub")! : "1"]}
          mode="inline"
          onClick={loadComponents}
          inlineCollapsed={collapsed}
          items={data.role_position === 2 ? itemsAdmin : items}
          style={{
            width: "271px",
            height: "100%",
            paddingTop: "15px",
          }}
        />
      </CustomScrollbars>
    </div>
  );
};

export default Sidebar;
