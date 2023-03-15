import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
export const ProtectedRoutes = () => {
  const user = useSelector(
    (state: RootState) => state.userReducers.profile["user"]
  );
  if (user.email === "") return null;
  return user.user_id !== BigInt(0) ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedRoutesAdmin = () => {
  const user = useSelector(
    (state: RootState) => state.userReducers.profile["user"]
  );
  return user.role_position === 2 ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedRoutesLeader = () => {
  const user = useSelector(
    (state: RootState) => state.userReducers.profile["user"]
  );
  return user.role_position! > 0 ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedRoutesCreateRequest = () => {
  const user = useSelector(
    (state: RootState) => state.userReducers.profile["user"]
  );
  return user.role_position! < 2 ? <Outlet /> : <Navigate to="/" />;
};
