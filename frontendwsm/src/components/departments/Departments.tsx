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
import { useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { DepartmentAttributes } from "../../interfaces/Department";
import { getDepartments } from "../../redux/slices/Departments.slice";
import { leader2, leader1 } from "./GetNameLeader";
import { HeaderComponentNotHolidays } from "../common/HeaderComponent";
type DataIndex = keyof DepartmentAttributes;

export default function Members() {
  let data: DepartmentAttributes[] = useSelector(
    (state: RootState) => state.departmentsReducers.departments
  );
  const dispatch = useAppDispatch();
  const [showComponent, setShowComponent] = useState(false);
  let members = useSelector((state: RootState) => state.membersReducers.users);
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
  ): ColumnType<DepartmentAttributes> => ({
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

  const columns: ColumnsType<DepartmentAttributes> = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Kí hiệu",
      dataIndex: "sign",
      key: "sign",
      ...getColumnSearchProps("sign"),
      sorter: (a, b) => a.sign.localeCompare(b.sign),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "leader 1",
      render: (record) => {
        return (
          <div>
            <p style={{ margin: "0" }}>{leader1(members)}</p>
          </div>
        );
      },
    },

    {
      title: "leader 2",
      dataIndex: "lead",
      key: "lead",
      render: (record) => {
        return (
          <div>
            <p style={{ margin: "0" }}>{leader2(record, members)}</p>
          </div>
        );
      },
    },

    {
      title: "",
      dataIndex: "department_id",
      key: "department_id",
      render: (record) => {
        return (
          <div className={"approval-member"}>
            <button
              className={"button-edit"}
              onClick={() => {
                navigate(`/departments/${record}/edit`);
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
    dispatch(getDepartments());
    dispatch(getMembers());
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {showComponent && (
        <div className="detail-info-user">
          <HeaderComponentNotHolidays title="Danh sách phòng ban" />
          <div className="detail-info-user_body">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      )}
    </>
  );
}
