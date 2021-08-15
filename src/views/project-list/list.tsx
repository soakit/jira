import React, { useEffect, useMemo } from "react";
import { ProjectSearch } from "./components/ProjectSearch";
import { ProjectTable } from "./components/ProjectTable";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjectModal, useProjectsSearchParams } from "./hooks/ProjectHooks";
import { ButtonNoPadding, ErrorBox, MainContainer } from "components/lib";
import { useDispatch } from "react-redux";
import { Row } from "antd";
import { useSelector } from "redux/store";
import { getProjectList, getProjectUsers } from "redux/project.slice";
import { Project } from "types/project";

// 状态提升可以让组件共享状态，但是容易造成 prop drilling

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
export const ProjectList = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const memoParam = useMemo<Partial<Project>>(() => {
    const obj: Partial<Project> = {};
    if (param.name) {
      obj.name = param.name;
    }
    if (param.personId) {
      obj.personId = param.personId;
    }
    return obj;
  }, [param.name, param.personId]);
  const debounceParam = useDebounce(memoParam, 500);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.project.projectList);
  const users = useSelector((state) => state.project.users);
  const isLoading = useSelector((state) => state.project.isLoading);
  const error = useSelector((state) => state.project.error);

  const refresh = () => {
    dispatch(getProjectList(param));
  };
  useEffect(() => {
    dispatch(getProjectList(debounceParam));
  }, [dispatch, debounceParam]);

  useEffect(() => {
    dispatch(getProjectUsers({ useCache: true }));
  }, [dispatch]);

  return (
    <MainContainer>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <ProjectSearch users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <ProjectTable
        refresh={refresh}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        keyword={param.name}
      />
    </MainContainer>
  );
};

ProjectList.whyDidYouRender = false;
