import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  memberRequests,
  processedMemberRequests,
} from "../../../redux/slices/Requests.slice";
import Cookies from "js-cookie";
import { TableDetailRequest } from "../requestComponentComon/TableDetailRequest";
import { RequestProcessButton } from "../requestComponentComon/RequestProcessButton";
import { HeaderComponentNotHolidays } from "src/components/common/HeaderComponent";

export const DetaiMemberRequest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [showComponent, setShowComponent] = useState(false);
  const user = useSelector((state: RootState) => state.userReducers.profile);

  useEffect(() => {
    if (Cookies.get("tab") === "a") {
      dispatch(memberRequests());
    } else if (Cookies.get("tab") === "c") {
      dispatch(processedMemberRequests(1));
    } else if (Cookies.get("tab") === "d") {
      dispatch(processedMemberRequests(2));
    }
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  return (
    <>
      {showComponent && (
        <div className="detail-request">
          <HeaderComponentNotHolidays title="Chi tiết yêu cầu" />

          {
            <div className={"detail-request_body_tables"}>
              <div
                className={
                  Cookies.get("tab") !== "a" ? "hidden" : "approval-request"
                }
              >
                <RequestProcessButton
                  id={BigInt(id!)}
                  isDetail={true}
                  requestStatus={0}
                />
              </div>
              <TableDetailRequest id={BigInt(id!)} user={user} />
            </div>
          }
        </div>
      )}
    </>
  );
};
