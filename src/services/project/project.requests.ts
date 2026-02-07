import api from '../api';
import {
  GetProjectByIdResponse,
  GetProjectsByInstitutionIdResponse,
  GetProjectsResponse,
  ToggleFavoriteProjectResponse,
} from './project.types';

export const getProjects = async () => {
  const { data } = await api.get<GetProjectsResponse>('/project');
  return data;
};

export const getProjectById = async (id: number) => {
  const { data } = await api.get<GetProjectByIdResponse>(`/project/${id}`);
  return data;
};

export const getProjectsByInstitutionId = async (institutionId: number) => {
  const { data } = await api.get<GetProjectsByInstitutionIdResponse>(
    `/project/institution/${institutionId}`
  );
  return data;
};

export const toggleFavoriteProject = async (id: number) => {
  const { data } = await api.post<ToggleFavoriteProjectResponse>(
    `/project/toggle-favorite/${id}`,
    {}
  );
  return data;
};
