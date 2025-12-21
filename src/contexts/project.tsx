import { createContext, useState } from 'react';
import { ApiResponseError } from 'src/errors/ApiResponseError';
import {
  createProject as createProjectRequest,
  getProjectCategories as getProjectCategoriesRequest,
} from 'src/services/projects/requests';

// Define/Import types locally or from services if available
// The old CreateProjectResponse was:
type CreateProjectResponse = {
  description: string;
  name: string;
  media: string;
  subtitle: string;
  category: Record<string, any>;
  institutionId: number;
  accountId: number;
};

interface ProjectContextData {
  getProjects(): Promise<void>;
  saveProject(
    token: string, // Kept for compatibility but unused
    data: any
  ): Promise<[CreateProjectResponse | null, Error | ApiResponseError | null]>;
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
    _token: string,
    project: any
  ): Promise<[CreateProjectResponse | null, Error | ApiResponseError | null]> => {
    setLoading(true);
    try {
      const response = await createProjectRequest(project);
      setLoading(false);
      return [response, null];
    } catch (err: any) {
      setLoading(false);
      const apiError = new ApiResponseError(
        err.response?.data?.error || 'Error',
        err.response?.data?.message || err.message,
        err.response?.status || 500
      );
      setError(apiError);
      return [null, apiError];
    }
  };

  const updateProject = async (_data: any) => {};
  const deleteProject = async (_id: string) => {};
  const getProjectCategories = async (query: string) => {
    try {
      return await getProjectCategoriesRequest(query);
    } catch (err: any) {
      setError(err);
      return [];
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