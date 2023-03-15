import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import UserAttributes from "../../interfaces/User";
import { httpClient } from "../../util/axiosInterceptors";
import { ToastSuccess } from "../../components/common/toast/Toast";
import historyObject from "../../util/configRouter";
import Cookies from "js-cookie";

interface userInfomation {
  profile: UserAttributes;
}

const initialState: userInfomation = {
  profile: {
    user: {
      user_id: BigInt(0),
      email: "",
      firstname: "",
      lastname: "",
      avatar: "",
      gender: true,
      phone_number: "",
      address: "",
      department_id: BigInt(0)
    }
  }
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      // tra ve ket qua dang user
      const response: any = await httpClient.post<UserAttributes>(`/login`, { email, password });
      if (response.status == 200) {
        historyObject.push("/");
        Cookies.set("userID", response.data.user.user_id.toString());
      }
      return response.data;
    } catch (err) {}
  }
);

export const getInfoUser = createAsyncThunk("user/getInforUser", async (_, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.get<UserAttributes>(`/profile`, {
      signal: thunkAPI.signal
    });
    return response.data;
  } catch (error) {}
});

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (
    {
      firstname,
      lastname,
      avatar,
      gender,
      birthday,
      phone_number,
      address
    }: {
      firstname: string;
      lastname: string;
      avatar: string;
      gender: boolean;
      birthday: Date;
      phone_number: string;
      address: string;
    },
    thunkAPI
  ) => {
    try {
      // tra ve ket qua dang user
      const response: any = await httpClient.put<UserAttributes>(
        `/profile`,
        {
          firstname,
          lastname,
          avatar,
          gender,
          birthday,
          phone_number,
          address
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("edit profile successfully !");
        historyObject.push("/profile");
      }
      return response.data;
    } catch (error) {}
  }
);

export const editMember = createAsyncThunk(
  "user/editMember",
  async (
    {
      firstname,
      lastname,
      avatar,
      gender,
      birthday,
      phone_number,
      address,
      becoming_offcial_employee,
      join_company,
      department_id,
      holidays,
      role_position,
      user_id
    }: any,
    thunkAPI
  ) => {
    try {
      // tra ve ket qua dang user
      const response: any = await httpClient.put<UserAttributes>(
        `/members/${user_id}/edit`,
        {
          firstname,
          lastname,
          avatar,
          gender,
          birthday,
          phone_number,
          address,
          becoming_offcial_employee,
          join_company,
          department_id,
          holidays,
          role_position
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("edit member successfully !");
        historyObject.push("/members");
      }
      return response.data;
    } catch (error) {}
  }
);

export const signUpMember = createAsyncThunk(
  "user/signUpMember",
  async (
    {
      firstname,
      lastname,
      avatar,
      email,
      gender,
      birthday,
      phone_number,
      address,
      becoming_offcial_employee,
      join_company,
      department_id,
      holidays,
      role_position,
      password
    }: any,
    thunkAPI
  ) => {
    try {
      // tra ve ket qua dang user
      const response: any = await httpClient.post<UserAttributes>(
        `/signup`,
        {
          firstname,
          lastname,
          avatar,
          email,
          gender,
          birthday,
          phone_number,
          address,
          becoming_offcial_employee,
          join_company,
          department_id,
          holidays,
          role_position,
          password
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("signUp member successfully !");
        historyObject.push("/members");
      }
      return response.data;
    } catch (error) {}
  }
);

export const deleteMember = createAsyncThunk("user/deleteMember", async (user_id: bigint, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.delete<UserAttributes>(`/members/${user_id}/delete`, {
      signal: thunkAPI.signal
    });
    if (response.status === 200) {
      ToastSuccess("delete member successfully !");
      historyObject.push("/members");
    }
    return response.data;
  } catch (error) {}
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.get<UserAttributes>(`/logout`, {
      signal: thunkAPI.signal
    });
    if (response.status === 200) {
      ToastSuccess("you are Loging out");
      historyObject.push("/login");
    }
    return response.status;
  } catch (error) {}
});

// khai bao slice
const slice = createSlice({
  name: "USER",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      .addCase(editProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      .addCase(editMember.fulfilled, (state, action) => {})

      .addCase(logout.fulfilled, (state, action) => {})

      .addCase(deleteMember.fulfilled, (state, action) => {})

      .addCase(signUpMember.fulfilled, (state, action) => {})

      // khi naof baams vao cancel thi se thuc hien
      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const userReducers = slice.reducer;
export const {} = slice.actions;
export default userReducers;
