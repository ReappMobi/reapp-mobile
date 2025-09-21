import { createContext, useState } from 'react';
import type { ApiResponseError } from 'src/errors/ApiResponseError';
import { createProject, getProjectsCategories } from 'src/services/project';
import type { IProject } from 'src/types';
import type { ApiErrorResponse } from 'src/types/IApiResponseError';
import type { Category } from 'src/types/ICategory';

interface ProjectContextData {
  getProjects(): Promise<void>;
  saveProject(
    token: string,
    data: any
  ): Promise<[IProject, Error | ApiResponseError]>;
  updateProject(data: any): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getProjectCategories(query: string): Promise<Category[]>;
  setCurrentCategory(category: Category): void;
  error: ApiErrorResponse | Error | null;
  category: Category | null;
  loading: boolean;
}

export const ProjectContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

export function ProjectProvider({ children }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<ApiErrorResponse | Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjects = async () => {};
  const saveProject = async (token: string, project: any) => {
    setLoading(true);
    const response = await createProject(token, project);
    setLoading(false);
    return response;
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
  const setCurrentCategory = (category: Category) => {
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
