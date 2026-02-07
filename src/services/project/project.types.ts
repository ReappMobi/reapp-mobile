import { IProject } from '@/types';

export type GetProjectsResponse = IProject[];

export type GetProjectByIdResponse = IProject;

export type GetProjectsByInstitutionIdResponse = IProject[];

export type ToggleFavoriteProjectResponse = {
  message: string;
};
