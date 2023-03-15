import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../util/axiosInterceptors";
import UserAttributes from "../../interfaces/User";

interface Member {
  member: UserAttributes["user"];
}

const initialState: Member = {
  member: {
    user_id: BigInt(0),
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    gender: true,
    birthday: new Date(),
    phone_number: "",
    address: "",
    password: "",
    becoming_offcial_employee: new Date(),
    join_company: new Date(),
    holidays: 0,
    department_id: BigInt(0),
    role_position: 0
  }
};

// lay 1 member
export const getInfoMember = createAsyncThunk("user/info-a-member", async (userId: bigint, thunkAPI) => {
  try {
    const response: any = await httpClient.get<UserAttributes>(`/members/${userId}`);
    return response.data;
  } catch (err) {}
});

const slice = createSlice({
  name: "MEMBER",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getInfoMember.fulfilled, (state, action) => {
        state.member = action.payload;
      })

      .addDefaultCase((state, action) => {
        return state;
      });
  }
});
const memberReducers = slice.reducer;
export const {} = slice.actions;
export default memberReducers;
