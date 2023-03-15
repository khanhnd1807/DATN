import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../util/axiosInterceptors";
import RequestAttributes from "../../interfaces/Request";
import { ToastSuccess } from "../../components/common/toast/Toast";
import historyObject from "../../util/configRouter";
import { store } from "../store";

interface Requests {
  requests: RequestAttributes[];
}
const initialState: Requests = {
  requests: []
};

export const createRequest = createAsyncThunk(
  "REQUEST/create",
  async ({ created_at, detail, time_start, time_end, description, phone_number }: RequestAttributes, thunkAPI) => {
    try {
      const response: any = await httpClient.post<RequestAttributes>(
        `/requests`,
        {
          created_at,
          detail,
          time_start,
          time_end,
          description,
          phone_number
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("Create request successfully");
        historyObject.push("/user/my-request");
      }
      return response.data;
    } catch (error) {}
  }
);

export const editRequest = createAsyncThunk(
  "REQUEST/edit",
  async ({ request_id, detail, time_start, time_end, description, phone_number }: RequestAttributes, thunkAPI) => {
    try {
      const response: any = await httpClient.put<RequestAttributes>(
        `/requests/${request_id}`,
        {
          detail,
          time_start,
          time_end,
          description,
          phone_number
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("Create request successfully");
        historyObject.push("/user/my-request");
      }
      return response.data;
    } catch (error) {}
  }
);

export const requests = createAsyncThunk("REQUEST/my-request", async (_, thunkAPI) => {
  try {
    const response: any = await httpClient.get<RequestAttributes>(`/requests`, {
      signal: thunkAPI.signal
    });
    return response.data;
  } catch (error) {}
});

export const memberRequests = createAsyncThunk("REQUEST/member-requests", async (_, thunkAPI) => {
  try {
    const response: any = await httpClient.get<RequestAttributes>(`/requests-member`, {
      signal: thunkAPI.signal
    });
    return response.data;
  } catch (error) {}
});

export const acceptMemberRequests = createAsyncThunk(
  "REQUEST/Accept-member-requests",
  async (request_id: bigint, thunkAPI) => {
    try {
      const response: any = await httpClient.put<RequestAttributes>(`/requests/${request_id}/accept`, {
        signal: thunkAPI.signal
      });
      if (response.status === 200) {
        ToastSuccess("you accepted this request");
        store.dispatch(memberRequests());
        historyObject.push("/member/requests");
      }
      return response.data;
    } catch (error) {}
  }
);

export const rejectMemberRequests = createAsyncThunk("REQUEST/Reject-member-requests", async (id: bigint, thunkAPI) => {
  try {
    const response: any = await httpClient.put<RequestAttributes>(`/requests/${id}/reject`, {
      signal: thunkAPI.signal
    });
    if (response.status === 200) {
      ToastSuccess("you rejected this request");
      store.dispatch(memberRequests());
      historyObject.push("/member/requests");
    }
    return response.data;
  } catch (error) {}
});

export const processedMemberRequests = createAsyncThunk(
  "REQUEST/processed-member-requests",
  async (status: number, thunkAPI) => {
    try {
      const response: any = await httpClient.get<RequestAttributes>(`/requests/requests-processed/${status}`, {
        signal: thunkAPI.signal
      });
      return response.data;
    } catch (error) {}
  }
);

const slice = createSlice({
  name: "REQUEST",
  initialState,
  reducers: {
    confirmMemberRequests: (state, action) => {
      state.requests = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createRequest.fulfilled, (state, action) => {})

      .addCase(requests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })

      .addCase(memberRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })

      .addCase(acceptMemberRequests.fulfilled, (state, action) => {})

      .addCase(rejectMemberRequests.fulfilled, (state, action) => {})

      .addCase(processedMemberRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })

      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const requestsReducers = slice.reducer;
export const { confirmMemberRequests } = slice.actions;
export default requestsReducers;
