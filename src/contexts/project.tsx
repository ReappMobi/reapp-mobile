import { createContext, useState } from 'react';
import { ProjectCategory } from '@/services/project/project.types';

interface ProjectContextData {
  setCurrentCategory: (category: ProjectCategory | null) => void;
  category: ProjectCategory | null;
}

export const ProjectContext = createContext<ProjectContextData>(
  {} as ProjectContextData
);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<ProjectCategory | null>(null);

  const setCurrentCategory = (category: ProjectCategory | null) => {
    setCategory(category);
  };

  return (
    <ProjectContext.Provider
      value={{
        setCurrentCategory,
        category,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
