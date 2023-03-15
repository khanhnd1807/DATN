import React from "react";
import "antd/dist/antd.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteMember } from "../../redux/slices/Profile.slice";
import { store } from "../../redux/store";

const ModalCaution = (user_id: bigint) => {
  Modal.confirm({
    title: "Caution",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure that you want to delete this employee?",
    onOk() {
      store.dispatch(deleteMember(user_id));
    },
    okText: "yes",
    cancelText: "cancel",
  });
};

export default ModalCaution;
