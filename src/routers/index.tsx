import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProjectList } from "views/project-list/list";
import MainLayout from "layouts/MainLayout";
import { Project } from "views/project";
import { ProjectModal } from "components/ProjectModal";

const Router: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:projectId/*" element={<Project />} />
          <Route path="*" element={<Navigate to="/projects" />} />
        </Routes>
      </MainLayout>
      <ProjectModal />
    </>
  );
};

export default Router;
