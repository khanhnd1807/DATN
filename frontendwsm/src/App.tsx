//import { Calendar } from "@components/calendar";
import { Calendar } from "./components/calendar";
import "./style/style.scss";
import HomePage from "./page/HomePage";
import MyRequest from "./components/request/MyRequest";
import RequestProcessing from "./components/request/admin/RequestsProcessing";
import DetailInfoUser from "./components/profile/Profile";
import { Routes, Route } from "react-router-dom";
import { EditInfoUser } from "./components/profile/EditProfile";
import { CreateRequest } from "./components/request/CreateRequest";
import { Login } from "./page/Login";
import { NotFound } from "./page/NotFound";
import { DetailRequest } from "./components/request/DetailRequest";
import { EditRequest } from "./components/request/editRequest";
import { DetaiMemberRequest } from "./components/request/admin/MemberRequestDetail";
import Members from "./components/members/Members";
import { EditMember } from "./components/members/EditMember";
import { SignUp } from "./components/members/SignUp";
import Departments from "./components/departments/Departments";
import { EditDepartment } from "./components/departments/EditDepartment";
import { AddaDepartment } from "./components/departments/AddDepartment";
import {
  ProtectedRoutes,
  ProtectedRoutesAdmin,
  ProtectedRoutesCreateRequest,
  ProtectedRoutesLeader,
} from "./util/ProtectedRouter";
import { useAppDispatch } from "./redux/store";
import { useEffect } from "react";
import { getInfoUser } from "./redux/slices/Profile.slice";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getInfoUser());
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="" element={<HomePage />}>
            <Route element={<ProtectedRoutesCreateRequest />}>
              <Route path="user/request/:id/edit" element={<EditRequest />} />
              <Route path="create-request" element={<CreateRequest />} />
              <Route path="user/requets/:id" element={<DetailRequest />} />
            </Route>
            <Route index element={<Calendar />} />
            <Route path="" element={<Calendar />} />
            <Route path="user/my-request" element={<MyRequest />} />
            <Route path="profile" element={<DetailInfoUser />} />
            <Route path="edit-profile" element={<EditInfoUser />} />
            <Route path="member/requests" element={<RequestProcessing />} />

            <Route element={<ProtectedRoutesLeader />}>
              <Route
                path="member/requets/:id"
                element={<DetaiMemberRequest />}
              />
            </Route>
            <Route element={<ProtectedRoutesAdmin />}>
              <Route path="members" element={<Members />} />
              <Route path="members/sign-up" element={<SignUp />} />
              <Route path="members/:user_id/edit" element={<EditMember />} />
              <Route path="departments" element={<Departments />} />
              <Route path="add-department" element={<AddaDepartment />} />
              <Route
                path="departments/:department_id/edit"
                element={<EditDepartment />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
