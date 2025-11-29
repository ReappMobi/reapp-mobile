import { createContext, useState } from 'react';
import { ApiResponseError } from 'src/errors/ApiResponseError';
import {
  CreateProjectResponse,
  createProject,
  getProjectsCategories,
} from 'src/services/project';

interface ProjectContextData {
  getProjects(): Promise<void>;
  saveProject(
    token: string,
    data: any
  ): Promise<[CreateProjectResponse, Error | ApiResponseError]>;
  updateProject(data: any): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getProjectCategories(query: string): Promise<Record<string, any>[]>;
  setCurrentCategory(category: Record<string, any>): void;
  error: ApiResponseError | Error | null;
  category: Record<string, any> | null;
  loading: boolean;
}

export const ProjectContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

export function ProjectProvider({ children }) {
  const [category, setCategory] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<ApiResponseError | Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjects = async () => {};
  const saveProject = async (
    token: string,
    project: any
  ): Promise<[CreateProjectResponse, Error | ApiResponseError]> => {
    setLoading(true);
    const [response, error] = await createProject(token, project);
    setLoading(false);
    if (error) {
      setError(error);
    }
    return [response, error];
  };

  const updateProject = async (_data: any) => {};
  const deleteProject = async (_id: string) => {};
  const getProjectCategories = async (query: string) => {
    try {
      return await getProjectsCategories(query);
    } catch (error) {
      setError(error);
    }
  };
  const setCurrentCategory = (category: Record<string, any>) => {
    setCategory(category);
  };

  return (
    <ProjectContext.Provider
      value={{
        getProjects,
        saveProject,
        updateProject,
        deleteProject,
        getProjectCategories,
        setCurrentCategory,
        error,
        category,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
