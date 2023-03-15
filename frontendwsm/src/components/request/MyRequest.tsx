import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { requests } from "../../redux/slices/Requests.slice";
import { TableRequest } from "./requestComponentComon/TableRequest";
import { HeaderComponentWithHolidays } from "../common/HeaderComponent";
import { CustomError } from "src/middlewares/handlerError";
import { ToastError } from "../common/toast/Toast";

const MyRequest: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRequests = useSelector(
    (state: RootState) => state.requestsReducers
  );
  const user = useSelector(
    (state: RootState) => state.userReducers.profile.user
  );
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    dispatch(requests());
    setTimeout(() => {
      setShowComponent(!showComponent);
    }, 100);
  }, []);

  const handleClick = () => {
    if (user.role_position === 2) {
      ToastError("Admin cannot create request.");
      throw new CustomError("Admin cannot create Request");
    }
    navigate("/create-request");
  };

  return (
    <>
      {showComponent && (
        <div className="my-request">
          <HeaderComponentWithHolidays
            title="Yêu cầu của tôi"
            holidays={user.holidays!}
          />
          <div className="section-of-create-request">
            <Button
              variant="contained"
              className="section-of-create-request_button"
              onClick={() => {
                handleClick();
              }}
            >
              <AddRoundedIcon className="add-rounded-icon" />
              Thêm yêu cầu
            </Button>
          </div>
          <TableRequest userRequests={userRequests.requests} mySelf={true} />
        </div>
      )}
    </>
  );
};
export default MyRequest;
