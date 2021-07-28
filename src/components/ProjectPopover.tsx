import React, { useEffect } from "react";
import { Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "views/project-list/hooks/ProjectHooks";
import { useSelector } from "redux/store";
import { useDispatch } from "react-redux";
import { getOriginList } from "redux/project.slice";

export const ProjectPopover = () => {
  const { open } = useProjectModal();

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projectList);
  const pinnedProjects = projects?.filter((project) => project.pin);

  useEffect(() => {
    if (!projects.length) {
      dispatch(getOriginList());
    }
  }, [dispatch, projects.length]);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span style={{ marginLeft: "2rem", marginRight: "2rem" }}>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
