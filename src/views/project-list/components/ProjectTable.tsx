import React from "react";
import { Dropdown, Menu, Modal, Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
// react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...
import { Link } from "react-router-dom";
import { Pin } from "components/Pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "../hooks/ProjectHooks";
import { Project } from "types/project";
import { User } from "types/user";
import { Mark } from "components/Mark";

interface ListProps extends TableProps<Project> {
  users: User[];
  keyword?: string;
  refresh: () => void;
}

export const ProjectTable = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  // 方式2: point free
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // 方式1:
                // onCheckedChange={pin => {
                //   return (id: number, pin: boolean) => mutate({id, pin}).then(props.refresh);
                // }}
                // 方式2: point free
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            // return <Link to={String(project.id)}>{project.name}</Link>;
            return (
              <Link to={String(project.id)}>
                <Mark keyword={props.keyword} name={project.name} />
              </Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} refresh={props.refresh} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({
  project,
  refresh,
}: {
  project: Project;
  refresh: () => void;
}) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject();
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id }).then(refresh);
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key={"delete"}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
