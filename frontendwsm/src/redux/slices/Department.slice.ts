import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../util/axiosInterceptors";
import { DepartmentAttributes } from "src/interfaces/Department";

interface Department {
  department: DepartmentAttributes;
}

const initialState: Department = {
  department: {
    lead: BigInt(0),
    department_id: BigInt(0),
    name: "",
    sign: ""
  }
};

// lay 1 department
export const getDepartment = createAsyncThunk(
  "department/info-a-department",
  async (department_id: bigint, thunkAPI) => {
    try {
      const response: any = await httpClient.get<Department>(`/deparments/${department_id}`);
      return response.data;
    } catch (err) {}
  }
);

const slice = createSlice({
  name: "DEPARTMENT",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.department = action.payload;
      })

      .addDefaultCase((state, action) => {
        return state;
      });
  }
});
const departmentReducers = slice.reducer;
export const {} = slice.actions;
export default departmentReducers;
