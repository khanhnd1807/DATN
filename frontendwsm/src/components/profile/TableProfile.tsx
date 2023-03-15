import moment from "moment";
import UserAttributes from "src/interfaces/User";
import { RowTableUser } from "../common/table/RowTable";

export const TableInforUser = ({ data }: { data: UserAttributes }) => {
  return (
    <table className="panel1_table">
      <tbody>
        <RowTableUser title="Email" detail={data.user ? data.user.email : ""} />

        <RowTableUser
          title="Họ tên"
          detail={
            data.user ? data.user.lastname + " " + data.user.firstname : ""
          }
        />

        <RowTableUser
          title="Bộ phận"
          detail={data.user.Department ? data.user.Department.name! : ""}
        />
        <RowTableUser title="Email Leader" detail={data.mailAdmin!} />

        <RowTableUser
          title="Giới tính"
          detail={data.user ? (data.user.gender === true ? "Nam" : "Nữ") : ""}
        />

        <RowTableUser
          title="Địa chỉ"
          detail={data.user ? data.user.address : ""}
        />

        <RowTableUser title="Thâm niên" detail="" />

        <RowTableUser
          title="Số điện thoại"
          detail={data.user ? data.user.phone_number : ""}
        />

        <RowTableUser
          title="Ngày sinh"
          detail={
            data.user ? moment(data.user.birthday).format("DD/MM/YYYY") : ""
          }
        />

        <RowTableUser
          title="Ngày vào công ty"
          detail={
            data.user ? moment(data.user.join_company).format("DD/MM/YYYY") : ""
          }
        />

        <RowTableUser
          title="Ngày lên chính thức"
          detail={
            data.user.becoming_offcial_employee !== null
              ? moment(data.user.becoming_offcial_employee).format("DD/MM/YYYY")
              : ""
          }
        />

        <RowTableUser title="Hợp đồng" detail="" />

        <RowTableUser
          title="Số ngày phép còn lại"
          detail={data.user.holidays!.toString()}
        />
      </tbody>
    </table>
  );
};

export const TableAssets = () => {
  return (
    <table className="panel2_table">
      <tbody>
        <RowTableUser title="ghế" detail="Ghế-08" />
      </tbody>
    </table>
  );
};

export const TableLeader = ({ data }: { data: UserAttributes }) => {
  return (
    <table className="panel2_table">
      <thead>
        <th className="panel2_table_table2-colum1">Group</th>
        <th className="panel2_table_table2-colum2">L1</th>
        <th className="panel2_table_table2-colum3">L2</th>
      </thead>
      <tbody>
        <tr className="panel2_table_row">
          <td className="panel2_table_row_table2-colum1">
            {data.user.Department ? data.user.Department.sign : ""}
          </td>
          <td className="panel2_table_row_table2-colum2">
            {data.adminName ? data.adminName : ""}
          </td>
          <td className="panel2_table_row_table2-colum3">
            {data.leadName ? data.leadName : ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
