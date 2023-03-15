import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import UserAttributes from "../../interfaces/User";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const SelectLeader = ({
  leader,
  setLeader,
}: {
  leader: bigint;
  setLeader: Function;
}) => {
  var members = useSelector((state: RootState) => state.membersReducers.users);
  const [leaderId, setLeaderId] = useState<bigint>();
  useEffect(() => {
    let isHaveLeader: boolean = false;
    members.map((member, index) => {
      if (member.user_id == leader) {
        setLeaderId(leader);
        isHaveLeader = true;
      } // phong co leader
    });
  }, [leader, members]);
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
      value={leaderId!}
      onChange={(e) => {
        setLeaderId(e);
        setLeader(e);
      }}
      options={members.map((member: UserAttributes["user"], index) => {
        return {
          value: member.user_id,
          label: member.lastname + " " + member.firstname,
        };
      })}
    />
  );
};

export default SelectLeader;
