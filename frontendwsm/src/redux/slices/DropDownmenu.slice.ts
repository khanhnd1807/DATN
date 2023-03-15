import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface status {
  status: number;
}

const initialState: status = {
  status: 0,
};

const slice = createSlice({
  name: "STATUS-DROP_DOWM_MENU",
  initialState,
  reducers: {
    statusDropDownMenu: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
  },
});

const statusDropDownMenuReducers = slice.reducer;
export const { statusDropDownMenu } = slice.actions;
export default statusDropDownMenuReducers;
