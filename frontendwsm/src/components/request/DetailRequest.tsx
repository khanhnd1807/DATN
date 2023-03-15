import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requests } from "../../redux/slices/Requests.slice";
import { TableDetailRequest } from "./requestComponentComon/TableDetailRequest";
import { HeaderComponentNotHolidays } from "../common/HeaderComponent";

export const DetailRequest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.userReducers.profile);

  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    dispatch(requests());
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  return (
    <>
      {" "}
      {showComponent && (
        <div className="detail-request">
          <HeaderComponentNotHolidays title="Chi tiết yêu cầu" />

          <div className="detail-request_body_tables">
            <TableDetailRequest id={BigInt(id!)} user={user} />
          </div>
        </div>
      )}
    </>
  );
};
