import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RequestAttributes from "src/interfaces/Request";
import { httpClient } from "../../util/axiosInterceptors";

interface Request {
  request: RequestAttributes;
}

const initialState: Request = {
  request: {
    request_id: BigInt(0),
    user_id: BigInt(0),
    created_at: new Date(),
    detail: "",
    time_start: new Date(),
    time_end: new Date(),
    phone_number: "",
    description: "",
    status: 0,
    status_exist: 0,
    role_position: 0,
    email_user: "",
    email_leader: ""
  }
};

// lay 1 department
export const getRequest = createAsyncThunk("request/detail-a-request", async (request_id: bigint, thunkAPI) => {
  try {
    const response: any = await httpClient.get<RequestAttributes>(`/requests/${request_id}`);
    return response.data;
  } catch (err) {}
});

const slice = createSlice({
  name: "REQUEST",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRequest.fulfilled, (state, action) => {
        state.request = action.payload;
      })

      .addDefaultCase((state, action) => {
        return state;
      });
  }
});
const requestReducers = slice.reducer;
export const {} = slice.actions;
export default requestReducers;
