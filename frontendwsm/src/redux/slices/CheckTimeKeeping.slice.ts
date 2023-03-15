import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAttributes from "../../interfaces/User";
import { httpClient } from "../../util/axiosInterceptors";

interface checkTimeKeeping {
  check: string;
}
const initialState: checkTimeKeeping = {
  check: "3"
};

export const checkTimeKeeping = createAsyncThunk("CHECK-TIME-KEEPING/check-time-keeping", async (_, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.get<UserAttributes>(`/time-keeping`, {
      signal: thunkAPI.signal
    });
    return response.data;
  } catch (error) {}
});

const slice = createSlice({
  name: "CHECK-TIME-KEEPING",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkTimeKeeping.fulfilled, (state, action) => {
        state.check = action.payload;
      })

      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const timeKeepingReducers = slice.reducer;
export const {} = slice.actions;
export default timeKeepingReducers;
