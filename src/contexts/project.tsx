import { createContext, useState } from 'react';
import {
  CreateProjectResponse,
  createProject,
  getProjectsCategories,
} from 'src/services/project';
import { ReappException } from '@/errors/ReappException';

interface ProjectContextData {
  getProjects(): Promise<void>;
  saveProject(
    token: string,
    data: any
  ): Promise<[CreateProjectResponse, Error | ReappException]>;
  updateProject(data: any): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getProjectCategories(query: string): Promise<Record<string, any>[]>;
  setCurrentCategory(category: Record<string, any>): void;
  error: ReappException | Error | null;
  category: Record<string, any> | null;
  loading: boolean;
}

export const ProjectContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

export function ProjectProvider({ children }) {
  const [category, setCategory] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<ReappException | Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjects = async () => {};
  const saveProject = async (
    token: string,
    project: any
  ): Promise<[CreateProjectResponse, Error | ReappException]> => {
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
