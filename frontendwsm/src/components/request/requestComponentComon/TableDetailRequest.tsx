import moment from "moment";
import { useSelector } from "react-redux";
import UserAttributes from "src/interfaces/User";
import { getRequest } from "src/redux/slices/Request.slice";
import { RootState, store } from "src/redux/store";
import { useEffect } from "react";
import { Row, RowStatus } from "../../common/table/RowTable";
export const TableDetailRequest = ({
  id,
  user,
}: {
  id: bigint;
  user: UserAttributes;
}) => {
  useEffect(() => {
    store.dispatch(getRequest(id));
  }, []);
  const userRequest = useSelector(
    (state: RootState) => state.requestReducers.request
  );

  return (
    <div className="panel1">
      <table className="panel1_table">
        <tbody>
          <Row title="Nội dung" detail={userRequest.detail} />
          <Row title="Người tạo" detail={userRequest.email_user!} />
          <Row title="Người duyệt" detail={userRequest.email_leader!} />
          <RowStatus request={userRequest} />
          <Row
            title="Thời hạn"
            detail={`${moment(userRequest.time_start).format(
              "YYYY-MM-DD HH:mm"
            )} ~ ${moment(userRequest.time_end).format("YYYY-MM-DD HH:mm")}`}
          />
          <Row title="Số điện thoại" detail={userRequest.phone_number} />
          <Row title="Dự án" detail={user.user.Department!.sign!} />
          <Row title="Lý do" detail={userRequest.description} />
        </tbody>
      </table>
    </div>
  );
};
