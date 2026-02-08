import { IProject } from '@/types';

export type GetProjectsResponse = IProject[];

export type GetProjectByIdResponse = IProject;

export type GetProjectsByInstitutionIdResponse = IProject[];

export type ToggleFavoriteProjectResponse = {
  message: string;
};

export interface CreateProjectData {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  media: string;
}

export interface CreateProjectResponse {
  description: string;
  name: string;
  media: string;
  subtitle: string;
  category: Record<string, any>;
  institutionId: number;
  accountId: number;
}

export interface ProjectCategory {
  id: number;
  name: string;
}
