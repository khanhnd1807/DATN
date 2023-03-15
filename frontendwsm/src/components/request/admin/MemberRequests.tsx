import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TableRequest } from "../requestComponentComon/TableRequest";
import { useState, useEffect } from "react";

const MemberRequests = () => {
  const userRequests = useSelector(
    (state: RootState) => state.requestsReducers
  );
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);
  return (
    <>
      {showComponent && (
        <div className="detail-request_member-requests">
          <TableRequest userRequests={userRequests.requests} mySelf={false} />
        </div>
      )}
    </>
  );
};
export default MemberRequests;
