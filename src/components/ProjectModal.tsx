import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import {
  useProjectEditModal,
  useProjectModal,
  useProjectsSearchParams,
} from "views/project-list/hooks/ProjectHooks";
import { UserSelect } from "components/UserSelect";
import { useAddProject, useEditProject } from "utils/project";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";
import { Project } from "types/project";
import { useDispatch } from "react-redux";
import { getProjectList } from "redux/project.slice";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  const { editingProject, isLoading } = useProjectEditModal();
  const dispatch = useDispatch();
  const [param] = useProjectsSearchParams();

  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutate, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutate({ ...editingProject, ...values } as Project).then(() => {
      form.resetFields();
      close();
      dispatch(getProjectList(param));
    });
  };
  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

ProjectModal.whyDidYouRender = false;
