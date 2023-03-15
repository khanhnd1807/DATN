import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { store, useAppDispatch } from "../../../redux/store";
import MemberRequests from "./MemberRequests";
import {
  confirmMemberRequests,
  memberRequests,
  processedMemberRequests,
} from "../../../redux/slices/Requests.slice";
import Cookies from "js-cookie";

const items: MenuProps["items"] = [
  {
    label: "Đang chờ duyệt",
    key: "a",
  },
  {
    label: "Đã xác nhận",
    key: "b",
  },
  {
    label: "Đã chấp nhận",
    key: "c",
  },
  {
    label: "Đã từ chối",
    key: "d",
  },
  {
    label: "Đã huỷ",
    key: "5",
  },
];

const RequestProcessing: React.FC = () => {
  const dispatch = useAppDispatch();

  const [current, setCurrent] = useState<string>(Cookies.get("tab") || "a");
  useEffect(() => {
    if (current === "a") {
      dispatch(memberRequests());
    } else if (current === "b") {
      store.dispatch(confirmMemberRequests([]));
    } else if (current === "c") {
      dispatch(processedMemberRequests(1));
    } else if (current === "d") {
      dispatch(processedMemberRequests(2));
    }
  }, [current]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "a") {
      Cookies.set("tab", "a");
    } else if (e.key === "b") {
      Cookies.set("tab", "b");
    } else if (e.key === "c") {
      Cookies.set("tab", "c");
    } else if (e.key === "d") {
      Cookies.set("tab", "d");
    }
  };

  return (
    <div className="processing-request">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          borderBottom: "0.5px solid #e9e9e9",
          width: "98%",
          textAlign: "center",
          marginLeft: "0.6rem",
        }}
      />
      <MemberRequests />
    </div>
  );
};

export default RequestProcessing;
