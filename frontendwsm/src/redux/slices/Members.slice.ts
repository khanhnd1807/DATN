import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../util/axiosInterceptors";
import UserAttributes from "../../interfaces/User";

interface Members {
  users: UserAttributes["user"][];
}

const initialState: Members = {
  users: []
};

export const getMembers = createAsyncThunk("USERS/members", async (_, thunkAPI) => {
  try {
    const response: any = await httpClient.get<UserAttributes>(`/members`, {
      signal: thunkAPI.signal
    });
    return response.data;
  } catch (error) {}
});

export const getMembersInDepartment = createAsyncThunk(
  "USERS/members-in-department",
  async (department_id: bigint, thunkAPI) => {
    try {
      const response: any = await httpClient.get<UserAttributes>(`/members/members-department/${department_id}`, {
        signal: thunkAPI.signal
      });
      return response.data;
    } catch (error) {}
  }
);

// lay 1 member
export const infoMember = createAsyncThunk("user/info-a-member", async ({ userId }: { userId: bigint }, thunkAPI) => {
  try {
    const response: any = await httpClient.get<UserAttributes>(`/members/${userId}`);
    return response.data;
  } catch (err) {}
});

const slice = createSlice({
  name: "USERS",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMembers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getMembersInDepartment.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const membersReducers = slice.reducer;
export const {} = slice.actions;
export default membersReducers;
