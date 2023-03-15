import "antd/dist/antd.min.css";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";

const items: MenuProps["items"] = [
  {
    label: `Yêu cầu [${0}]`,
    key: "1",
  },
  {
    label: `Cuộc phỏng vấn [${0}]`,
    key: "2",
  },
];

export const Notification = (props: { statusEnable: number }) => {
  const [statusToEnableNotify, setStatusToEnableNotify] = useState(
    props.statusEnable
  );

  useEffect(() => {
    setStatusToEnableNotify(props.statusEnable);
  }, [props.statusEnable]);

  const [current, setCurrent] = useState<string>("");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div
      className={
        statusToEnableNotify === 0
          ? "notification_not-active"
          : statusToEnableNotify === 1
          ? "notification"
          : "notification_disable"
      }
    >
      <div className="notification_header">
        <span>Thông báo</span>
      </div>

      <div className="notification_body">
        <div className="notification_body_menu">
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
        </div>

        <div className="notification_body_detail">
          <div className={current === "1" ? "" : "hidden"}>
            <ul>
              <li>
                <p>
                  <span className="span1">Nguyễn Thị Phương thảo </span>
                  <span className="span2">đã phê duyệt</span>
                  <span className="span3">
                    {" "}
                    Yêu cầu cập nhật thời gian checkin/checkout{" "}
                  </span>{" "}
                  của bạn.
                </p>
                <p className="time">26 Ngày trước</p>
              </li>
            </ul>
          </div>
          <div className={current === "2" ? "" : "hidden"}>
            <p className="interview-notification">Không có thông báo mới</p>
          </div>
        </div>
      </div>
      <div className="notification_footer">
        <p>Đánh dấu là đã đọc</p>
        <p>Xem tất cả thông báo</p>
      </div>
    </div>
  );
};
