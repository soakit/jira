import { createSlice } from "@reduxjs/toolkit";
import { Project } from "types/project";
import { User } from "types/user";

interface State {
  projectModalOpen: boolean;
  project: Project[];
  user: User | null;
}

const initialState = {
  projectModalOpen: false,
  projects: [],
  user: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
});

export const projectActions = projectSlice.actions;
