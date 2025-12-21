import { IProject } from 'src/types/IProject';

export type CreateProjectData = {
  name: string;
  subtitle: string;
  description: string;
  categoryId: string | number;
  institutionId?: number;
  media: string;
};

export type ToggleFavoriteProjectData = {
  projectId: number;
};

export type GetProjectsResponse = IProject[];
