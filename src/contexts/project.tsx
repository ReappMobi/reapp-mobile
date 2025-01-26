import { createContext, useState } from 'react';
import { getProjectsCategories } from 'src/services/project';
import { Category } from 'src/types/ICategory';

interface ProjectContextData {
  getProjects(): Promise<void>;
  createProject(data: any): Promise<void>;
  updateProject(data: any): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getProjectCategories(query: string): Promise<Category[]>;
  setCurrentCategory(category: Category): void;
  error: Error | null;
  category: Category | null;
  loading: boolean;
}

export const ProjectContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

export function ProjectProvider({ children }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjects = async () => {};
  const createProject = async (data: any) => {
    setLoading(true);
    try {
      // await createProject(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (data: any) => {};
  const deleteProject = async (id: string) => {};
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
        createProject,
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
