import React from "react";
import "antd/dist/antd.min.css";
import "../../../style/style.scss";
import CircleIcon from "@mui/icons-material/Circle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import BookIcon from "@mui/icons-material/Book";
import type { MenuProps } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem("Lịch làm việc", "1", [
    <DateRangeIcon className="navbar-icon" />,
    <CircleIcon className="circle_active" />,
  ]),

  getItem("Các yêu cầu", "sub1", <ScreenShareIcon className="navbar-icon" />, [
    getItem("Yêu cầu của tôi", "2", <CircleIcon className="circle_active" />),
    getItem("Yêu cầu cần duyệt", "3", <CircleIcon className="circle_active" />),
  ]),

  getItem("Thư viện", "sub2", <BookIcon className="navbar-icon" />, [
    getItem("Nội quy công ty", "4", <CircleIcon className="circle_active" />),
    getItem("Chế độ nhân sự", "5", <CircleIcon className="circle_active" />),
    getItem(
      "Tài liệu hướng dẫn",
      "6",
      <CircleIcon className="circle_active" />
    ),
    getItem("Z-Magazine", "7", <CircleIcon className="circle_active" />),
  ]),
  getItem("Bảng tạm", "8", [
    <ContentPasteIcon className="navbar-icon" />,
    <CircleIcon className="circle_active" />,
  ]),
];

export const itemsAdmin: MenuItem[] = [
  getItem("Lịch làm việc", "1", [
    <DateRangeIcon className="navbar-icon" />,
    <CircleIcon className="circle_active" />,
  ]),

  getItem("Các yêu cầu", "sub1", <ScreenShareIcon className="navbar-icon" />, [
    getItem("Yêu cầu của tôi", "2", <CircleIcon className="circle_active" />),
    getItem("Yêu cầu cần duyệt", "3", <CircleIcon className="circle_active" />),
  ]),

  getItem("Nhân viên", "sub3", <ScreenShareIcon className="navbar-icon" />, [
    getItem("Quản lý nhân viên", "9", <CircleIcon className="circle_active" />),
    getItem("Thêm nhân viên", "10", <CircleIcon className="circle_active" />),
  ]),

  getItem("Phòng ban", "sub4", <ScreenShareIcon className="navbar-icon" />, [
    getItem(
      "Quản lý phòng ban",
      "11",
      <CircleIcon className="circle_active" />
    ),
    getItem("Thêm phòng ban", "12", <CircleIcon className="circle_active" />),
  ]),

  getItem("Thư viện", "sub2", <BookIcon className="navbar-icon" />, [
    getItem("Nội quy công ty", "4", <CircleIcon className="circle_active" />),
    getItem("Chế độ nhân sự", "5", <CircleIcon className="circle_active" />),
    getItem(
      "Tài liệu hướng dẫn",
      "6",
      <CircleIcon className="circle_active" />
    ),
    getItem("Z-Magazine", "7", <CircleIcon className="circle_active" />),
  ]),

  getItem("Bảng tạm", "8", [
    <ContentPasteIcon className="navbar-icon" />,
    <CircleIcon className="circle_active" />,
  ]),
];

export const renderThumb = ({ style, ...props }: any) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const CustomScrollbars = (props: any) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);
