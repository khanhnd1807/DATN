import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import checkTimeKeepingReducers from "./slices/CheckTimeKeeping.slice";
import statusDropDownMenuReducers from "./slices/DropDownmenu.slice";
import userReducers from "./slices/Profile.slice";
import requestReducers from "./slices/Request.slice";
import timeKeepingReducers from "./slices/TimeKeeings.slice";
import uploadReducers from "./slices/Upload.slice";
import membersReducers from "./slices/Members.slice";
import departmentsReducers from "./slices/Departments.slice";
import memberReducers from "./slices/Member.slice";
import departmentReducers from "./slices/Department.slice";
import requestsReducers from "./slices/Requests.slice";

export const store = configureStore({
  reducer: {
    userReducers: userReducers,
    uploadReducers: uploadReducers,
    timeKeepingReducers: timeKeepingReducers,
    statusDropDownMenu: statusDropDownMenuReducers,
    checkTimeKeeping: checkTimeKeepingReducers,
    requestsReducers: requestsReducers,
    membersReducers: membersReducers,
    memberReducers: memberReducers,
    departmentsReducers: departmentsReducers,
    departmentReducers: departmentReducers,
    requestReducers: requestReducers
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// lay rootstate va appdispatch tu store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
