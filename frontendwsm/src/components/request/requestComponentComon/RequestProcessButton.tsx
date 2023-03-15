import {
  acceptMemberRequests,
  memberRequests,
  rejectMemberRequests,
} from "src/redux/slices/Requests.slice";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "src/redux/store";
import RequestAttributes from "src/interfaces/Request";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export const RequestProcessButton = ({
  id,
  requestStatus,
  isDetail,
}: {
  id: bigint;
  requestStatus: number;
  isDetail: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="colum-action_button">
      <button
        className={isDetail === false ? "colum-action_button_eyes" : "hidden"}
        onClick={() => navigate(`/member/requets/${id}`)}
      >
        <VisibilityRoundedIcon className="colum-action_button_eyes_icon" />
      </button>
      <button
        className={requestStatus !== 0 ? "hidden" : "button-accept"}
        onClick={() => {
          dispatch(acceptMemberRequests(id));
          dispatch(memberRequests());
        }}
      >
        <DoneIcon className="button_accept_icon" />
      </button>
      <button
        className={requestStatus !== 0 ? "hidden" : "button-reject"}
        onClick={() => {
          dispatch(rejectMemberRequests(id));
          dispatch(memberRequests());
        }}
      >
        <ClearIcon className="button-reject_icon" />
      </button>
    </div>
  );
};

export const RequestMySelfButton = ({
  mySelf,
  request,
}: {
  mySelf: boolean;
  request: RequestAttributes;
}) => {
  const navigate = useNavigate();

  return (
    <div className={mySelf === true ? "colum-action_button" : "hidden"}>
      <button
        className="colum-action_button_eyes"
        onClick={() => navigate(`/user/requets/${request.request_id}`)}
      >
        <VisibilityRoundedIcon className="colum-action_button_eyes_icon" />
      </button>
      <button
        className={
          request.status == 0 ? "hidden" : "colum-action_button_download"
        }
      >
        <DownloadRoundedIcon className="colum-action_button_download_icon" />
      </button>
      <button
        className={
          request.status === 0 ? "colum-action_button_download" : "hidden"
        }
        onClick={() => {
          navigate(`/user/request/${request.request_id}/edit`);
        }}
      >
        <ModeEditIcon className="colum-action_button_download_icon" />
      </button>
    </div>
  );
};
