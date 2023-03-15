import moment from "moment";
import RequestAttributes from "src/interfaces/Request";
import {
  RequestMySelfButton,
  RequestProcessButton,
} from "./RequestProcessButton";

export const TableRequest = ({
  userRequests,
  mySelf,
}: {
  userRequests: RequestAttributes[];
  mySelf: boolean;
}) => {
  return (
    <table className="table-request">
      <thead>
        <th className="colum-deltai">Nội dung</th>
        <th className="colum-status">Trạng thái</th>
        <th className="colum-boss">Người gửi</th>
        <th className="colum-boss">Người xử lý</th>
        <th className="colum-time">Thời hạn</th>
        <th className="colum-action"></th>
      </thead>

      <tbody>
        {userRequests === undefined || userRequests.length === 0 ? (
          <tr>
            {" "}
            <td></td>
            <td></td>
            <td>
              <h6>Không có dữ liệu</h6>
            </td>
            <td></td>
            <td></td>
          </tr>
        ) : (
          userRequests.map((request, index) => {
            return (
              <tr key={index}>
                <td>{request.detail}</td>
                <td className="colum-status_result">
                  <span
                    style={
                      request.status === 2
                        ? {
                            padding: "1px 5px",
                            borderRadius: "50px",
                            backgroundColor: "#fd3995",
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "white",
                          }
                        : {
                            padding: "1px 5px",
                            borderRadius: "50px",
                            backgroundColor: "#1dc9b7",
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "white",
                          }
                    }
                  >
                    {request.status === 0
                      ? "Chờ duyệt"
                      : request.status === 1
                      ? "Đồng ý"
                      : "Từ chối"}
                  </span>
                </td>
                <td>{request.email_user}</td>
                <td>{request.email_leader}</td>
                <td>
                  {moment(request.time_start).format("YYYY-MM-DD HH:mm")} ~{" "}
                  {moment(request.time_end).format("YYYY-MM-DD HH:mm")}
                </td>
                <td>
                  <div className={mySelf === true ? "hidden" : ""}>
                    <RequestProcessButton
                      id={request.request_id!}
                      requestStatus={request.status!}
                      isDetail={false}
                    />
                  </div>

                  <RequestMySelfButton request={request} mySelf={mySelf} />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
