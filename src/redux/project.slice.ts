import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "types/project";
import * as ProjectApi from "api/project.api";
import { User } from "types/user";

interface State {
  projectModalOpen: boolean;
  originList: Project[];
  projectList: Project[];
  users: User[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: State = {
  projectModalOpen: false,
  originList: [],
  projectList: [],
  users: [],
  isLoading: false,
  error: null,
};

export const getOriginList = createAsyncThunk(
  "project/getOriginList",
  async () => {
    const data = await ProjectApi.getProjectList();
    return data;
  }
);

export const getProjectList = createAsyncThunk(
  "project/getProjectList",
  async (params: Partial<Project>, thunkAPI) => {
    const data = await ProjectApi.getProjectList(params);
    return data;
  }
);

export const getProjectUsers = createAsyncThunk(
  "project/getProjectUsers",
  async (params: any, thunkApi: any) => {
    const project = thunkApi.getState().project;
    if (params.useCache) {
      return project.users;
    }
    const data = await ProjectApi.getProjectUsers();
    return data;
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [getProjectList.pending.type](state) {
      state.isLoading = true;
    },
    [getProjectList.fulfilled.type](state, action: PayloadAction<Project[]>) {
      state.error = null;
      state.isLoading = false;
      state.projectList = action.payload;
    },
    [getProjectList.rejected.type](state, action) {
      state.error = new Error(action.error.message);
      state.isLoading = false;
      state.projectList = [];
    },
    [getOriginList.fulfilled.type](state, action: PayloadAction<Project[]>) {
      state.originList = action.payload;
    },
    [getOriginList.rejected.type](state, action) {
      state.originList = [];
    },
    [getProjectUsers.pending.type](state) {
      state.isLoading = true;
    },
    [getProjectUsers.fulfilled.type](state, action: PayloadAction<User[]>) {
      state.error = null;
      state.isLoading = false;
      if (action.payload && action.payload.length) {
        state.users = action.payload;
      }
    },
    [getProjectUsers.rejected.type](state, action) {
      state.error = new Error(action.error.message);
      state.isLoading = false;
      state.users = [];
    },
  },
});

export const projectActions = projectSlice.actions;
