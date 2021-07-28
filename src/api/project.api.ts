import { Project } from "types/project";
import { http } from "utils/http";
import { getToken } from "./auth.api";

export const getProjectList = async (data?: Partial<Project>) => {
  let list = [];
  const token = getToken();
  if (token) {
    const res = await http("projects", { token, data });
    list = res;
  }
  return list;
};

export const getProjectUsers = async () => {
  let list = [];
  const token = getToken();
  if (token) {
    const res = await http("users", { token });
    list = res;
  }
  return list;
};
