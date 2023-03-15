import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../util/axiosInterceptors";
import { ToastSuccess } from "../../components/common/toast/Toast";
import UserAttributes from "../../interfaces/User";
import { DepartmentAttributes } from "../../interfaces/Department";
import historyObject from "../../util/configRouter";

interface departments {
  departments: DepartmentAttributes[];
}

const initialState: departments = {
  departments: []
};

export const getDepartments = createAsyncThunk(
  "DEPARTMENTS/departments",
  async (_, thunkAPI) => {
    try {
      const response: any = await httpClient.get<UserAttributes>(
        `/departments`,
        {
          signal: thunkAPI.signal
        }
      );
      return response.data;
    } catch (error) {}
  }
);

export const updateDepartments = createAsyncThunk(
  "DEPARTMENTS/update-departments",
  async (
    { department_id, lead, name, sign }: DepartmentAttributes,
    thunkAPI
  ) => {
    try {
      const response: any = await httpClient.put<UserAttributes>(
        `/departments/${department_id}/edit`,
        {
          lead,
          name,
          sign
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("edit department successfully !");
        historyObject.push("/departments");
      }
      return response.data;
    } catch (error) {}
  }
);

export const addDepartments = createAsyncThunk(
  "DEPARTMENTS/add-departments",
  async (
    { lead, name, sign }: { name: string; sign: string; lead: bigint },
    thunkAPI
  ) => {
    try {
      const response: any = await httpClient.post<UserAttributes>(
        `/departments`,
        {
          lead,
          name,
          sign
        },
        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 200) {
        ToastSuccess("add department successfully !");
        historyObject.push("/departments");
      }
      return response.data;
    } catch (error) {}
  }
);

export const deleteDepartments = createAsyncThunk(
  "DEPARTMENTS/delete-departments",
  async (department_id: bigint, thunkAPI) => {
    try {
      const response: any = await httpClient.delete<UserAttributes>(
        `/departments/${department_id}/delete`,

        {
          signal: thunkAPI.signal
        }
      );
      if (response.status === 204) {
        ToastSuccess("delete department successfully !");
        historyObject.push("/departments");
      }
      return response.data;
    } catch (error) {}
  }
);

const slice = createSlice({
  name: "DEPARTMENTS",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(updateDepartments.fulfilled, (state, action) => {})
      .addCase(deleteDepartments.fulfilled, (state, action) => {})
      .addCase(addDepartments.fulfilled, (state, action) => {})
      .addDefaultCase((state, action) => {
        return state;
      });
  }
});

const departmentsReducers = slice.reducer;
export const {} = slice.actions;
export default departmentsReducers;
