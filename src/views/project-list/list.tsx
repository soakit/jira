import React from "react";
import { ProjectSearch } from "./components/ProjectSearch";
import { ProjectTable } from "./components/ProjectTable";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./hooks/ProjectHooks";
import { ButtonNoPadding, ErrorBox, MainContainer } from "components/lib";
import { Row } from "antd";

// 状态提升可以让组件共享状态，但是容易造成 prop drilling

// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
export const ProjectList = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

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
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </MainContainer>
  );
};

ProjectList.whyDidYouRender = false;
