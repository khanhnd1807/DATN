import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { DepartmentAttributes } from "../../interfaces/Department";

const SelectDepartments = ({
  role_position,
  department_id,
  selectDepartment,
}: {
  role_position: number;
  department_id: bigint;
  selectDepartment: Function;
}) => {
  const departments = useSelector(
    (state: RootState) => state.departmentsReducers.departments
  );
  const [departmentId, setDepartmentId] = useState<bigint>();
  useEffect(() => {
    if (Number(department_id) !== 0) setDepartmentId(department_id);
  }, [department_id]);
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      value={departmentId}
      onChange={(department_id) => {
        selectDepartment(department_id);
      }}
      options={departments.map((department: DepartmentAttributes, index) => {
        return {
          value: department.department_id,
          label: department.name,
        };
      })}
    />
  );
};

export default SelectDepartments;
