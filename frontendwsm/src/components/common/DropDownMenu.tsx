import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { RootState, store, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getInfoUser, logout } from "../../redux/slices/Profile.slice";
import { statusDropDownMenu } from "../../redux/slices/DropDownmenu.slice";
import historyObject from "../../util/configRouter";

export const InfoUser = () => {
  const { REACT_APP_BACKEND_APP = "http://be.wsm.zinza.com" } = process.env;
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.userReducers.profile);
  const status = useSelector(
    (state: RootState) => state.statusDropDownMenu.status
  );
  const [isEnableDropDownMenu, setIsEnableDropDownMenu] = useState<number>(
    status
  );

  useEffect(() => {
    setIsEnableDropDownMenu(status); // set trang thai cua dropdown menu khi prop.status menu thay doi
  }, [status]);

  const handleLogout = () => {
    Cookies.remove("userID");
    dispatch(logout());
    store.dispatch(statusDropDownMenu(0));
  };

  const handleGotoRequest = () => {
    store.dispatch(statusDropDownMenu(0));
    historyObject.push("/member/requests");
  };

  const handleGoToProfile = () => {
    store.dispatch(statusDropDownMenu(0));
    dispatch(getInfoUser());
    historyObject.push("/profile");
  };

  return (
    <div
      className={
        isEnableDropDownMenu === 0
          ? "personal-menu_not-active"
          : isEnableDropDownMenu === 1
          ? "personal-menu"
          : "personal-menu_disable"
      }
    >
      <div className="personal-menu_info">
        <img
          className="info-user_user_img"
          src={
            data.user.avatar !== ""
              ? REACT_APP_BACKEND_APP + "/" + data.user.avatar
              : "/user.png"
          }
        />
        <div>
          <h3 className="info-user_name">
            {data.user ? data.user.lastname + " " + data.user.firstname : ""}
          </h3>
          <p>{data.user ? data.user.email : ""}</p>
        </div>
      </div>

      <div className="personal-menu_action">
        <div
          className="personal-menu_action_info"
          onClick={() => {
            handleGoToProfile();
          }}
        >
          <span>Thông tin cá nhân</span>
        </div>
        <div
          className="personal-menu_action_request"
          onClick={() => {
            handleGotoRequest();
          }}
        >
          <span>Danh sách yêu cầu</span>
        </div>
      </div>

      <div className="personal-menu_logout" onClick={handleLogout}>
        <span>Đăng xuất</span>
      </div>
    </div>
  );
};
