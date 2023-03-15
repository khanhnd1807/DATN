import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import { InfoUser } from "./DropDownMenu";
import { useRef, useState } from "react";
import { Notification } from "./Notification";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { statusDropDownMenu } from "../../redux/slices/DropDownmenu.slice";
import { useOnClickOutside } from "usehooks-ts";

const Header: React.FC = () => {
  const { REACT_APP_BACKEND_APP = "http://be.wsm.zinza.com" } = process.env;
  const [isEnableDropDownMenu, setIsEnableDropDownMenu] = useState<number>(0);
  const [isEnableNotify, setIsEnableNotify] = useState<number>(0);
  const data: any = useSelector(
    (state: RootState) => state.userReducers.profile
  );
  const statusDDMenu = useSelector(
    (state: RootState) => state.statusDropDownMenu.status
  );

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    store.dispatch(statusDropDownMenu(0));
  });

  const dropDownMenu = () => {
    setIsEnableNotify(0);
    if (statusDDMenu === 0) {
      store.dispatch(statusDropDownMenu(1));
    } else if (statusDDMenu === 1) {
      store.dispatch(statusDropDownMenu(0));
    }
  };

  const enableNotify = () => {
    setIsEnableDropDownMenu(0);
    if (isEnableNotify === 0) {
      setIsEnableNotify(1);
    } else if (isEnableNotify === 1) {
      setIsEnableNotify(2);
    } else if (isEnableNotify === 2) {
      setIsEnableNotify(1);
    }
  };

  return (
    <div className="sidebar">
      <input className="search" placeholder="Tìm kiếm..." />
      <div className="sidebar_icon" ref={ref}>
        <SettingsIcon className="sidebar_icon_setting" />
        <NotificationsNoneIcon
          className="sidebar_icon_setting"
          onClick={() => {
            enableNotify();
          }}
        />
        <Notification statusEnable={isEnableNotify} />
        <img
          className={"sidebar_icon_user"}
          src={
            data.user.avatar !== ""
              ?REACT_APP_BACKEND_APP + "/" + data.user.avatar
              : "/user.png"
          }
          onClick={() => {
            dropDownMenu();
          }}
        />
        <InfoUser />
      </div>
    </div>
  );
};
export default Header;
