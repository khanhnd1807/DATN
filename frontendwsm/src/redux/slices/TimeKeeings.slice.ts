import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserAttributes from "../../interfaces/User";
import { httpClient } from "../../util/axiosInterceptors";
import TimeKeepingAttribute from "../../interfaces/TimeKeeping";

interface timeKeeping {
  timeKeepings: TimeKeepingAttribute[];
}
const initialState: timeKeeping = {
  timeKeepings: []
};

export const checkIn = createAsyncThunk("TIMEKEEPING/checkin", async (_, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.post<UserAttributes>(`/time-keepings/check-in`, {
      signal: thunkAPI.signal
    });
    //codeResponse({ code: response.status, message: "success" });
    return response.data;
  } catch (error) {}
});
export const checkOut = createAsyncThunk("TIMEKEEPING/checkout", async (_, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.put<UserAttributes>(`/time-keepings/check-out`, {
      signal: thunkAPI.signal
    });
    //codeResponse({ code: response.status, message: "success" });
    return response.data;
  } catch (error) {}
});
export const timeKeepings = createAsyncThunk("TIMEKEEPING/timeKeepings", async (_, thunkAPI) => {
  try {
    // tra ve ket qua dang user
    const response: any = await httpClient.get<UserAttributes>(`/time-keepings`, {
      signal: thunkAPI.signal
    });
    //codeResponse({ code: response.status, message: "success" });
    return response.data;
  } catch (error) {}
});

const slice = createSlice({
  name: "TIMEKEEPING",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkIn.fulfilled, (state, action) => {})
      .addCase(checkOut.fulfilled, (state, action) => {})
      .addCase(timeKeepings.fulfilled, (state, action) => {
        state.timeKeepings = action.payload;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const timeKeepingReducers = slice.reducer;
export const {} = slice.actions;
export default timeKeepingReducers;
