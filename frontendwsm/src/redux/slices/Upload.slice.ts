import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { instanceUpload } from "../../util/axiosInterceptors";

interface image {
  path: string;
}

const initialState: image = {
  path: ""
};

export const upload = createAsyncThunk("upload/image", async (data: any, thunkAPI) => {
  // tra ve ket qua dang user
  const response: any = await instanceUpload.post<image>(`/upload-files`, data, {
    signal: thunkAPI.signal
  });

  return response.data;
});

const slice = createSlice({
  name: "UPLOAD",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(upload.fulfilled, (state, action) => {
        state.path = action.payload;
      })

      // khi naof baams vao cancel thi se thuc hien
      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const uploadReducers = slice.reducer;
export const {} = slice.actions;
export default uploadReducers;
