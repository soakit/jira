import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
import { useMemo } from "react";
import { useProject } from "utils/project";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { isLoading, data: editingProject } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  // 返回tuple的好处：类似useState，可以随意命名，但顺序一定。
  // 一般返回值少于3个建议用tuple的形式。
  // return [
  //   projectCreate === "true", open, close,
  // ]  as const

  // 返回对象的好处：
  // 可以有更多的返回值，但解构时要按照返回的key来(可以使用es6重命名语法)

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
