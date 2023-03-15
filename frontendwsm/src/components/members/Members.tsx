import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
import "../../style/style.scss";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Input, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { RootState, useAppDispatch } from "../../redux/store";
import { getMembers } from "../../redux/slices/Members.slice";
import UserAttributes from "../../interfaces/User";
import { useSelector } from "react-redux";
import moment from "moment";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
type DataIndex = keyof UserAttributes["user"];

export default function Members() {
  let data: UserAttributes["user"][] = useSelector(
    (state: RootState) => state.membersReducers.users
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<UserAttributes["user"]> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: ColumnsType<UserAttributes["user"]> = [
    {
      title: "Họ đệm",
      dataIndex: "lastname",
      key: "lastname",
      width: "20%",
      ...getColumnSearchProps("lastname"),
      sorter: (a, b) => a.lastname.localeCompare(b.lastname),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Tên",
      dataIndex: "firstname",
      key: "fisrtname",
      width: "10%",
      ...getColumnSearchProps("firstname"),
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",

      ...getColumnSearchProps("birthday"),
      sorter: (a, b) => moment(a.birthday).unix() - moment(b.birthday).unix(),
      sortDirections: ["descend", "ascend"],
      render: (record) => {
        return (
          <div>
            <p style={{ margin: "0" }}>{moment(record).format("DD-MM-YYYY")}</p>
          </div>
        );
      },
    },

    {
      title: "Phòng ban",
      dataIndex: "Department",
      key: "Department",
      ...getColumnSearchProps("department_id"),
      render: (record) => {
        return (
          <div>
            <p style={{ margin: "0" }}>{record ? record.name : ""}</p>
          </div>
        );
      },
    },

    {
      title: "Chức vụ",
      dataIndex: "role_position",
      key: "role_position",
      ...getColumnSearchProps("role_position"),
      render: (record) => {
        return (
          <div>
            <p style={{ margin: "0" }}>
              {record === 0
                ? "Nhân viên"
                : record === 1
                ? "Trưởng phòng"
                : "Admin"}
            </p>
          </div>
        );
      },
    },

    {
      title: "",
      dataIndex: "user_id",
      key: "user_id",
      render: (record) => {
        return (
          <div className={"approval-member"}>
            <button
              className={"button-edit"}
              onClick={() => {
                navigate(`/members/${record}/edit`);
              }}
            >
              <ModeEditIcon className="button_edit_icon" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getMembers());
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  return (
    <>
      {showComponent && (
        <div className="detail-info-user">
          <div className="detail-info-user_header">
            <h3 className="my-request_header_tilte">Danh sách nhân viên</h3>
          </div>
          <div className="detail-info-user_body">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      )}
    </>
  );
}
