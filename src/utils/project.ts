import { useAsync } from "hooks/useAsync";
import { Project } from "types/project";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [param, client]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useDeleteProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "DELETE",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project>();

  const fetchProject = useCallback(() => {
    return id ? client(`projects/${id}`) : Promise.resolve({});
  }, [id, client]);

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject,
    });
  }, [id, run, fetchProject]);

  return result;
};
