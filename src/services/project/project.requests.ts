import { buildFormData } from '@/utils/form-data';
import api from '../api';
import {
  CreateProjectData,
  CreateProjectResponse,
  GetProjectByIdResponse,
  GetProjectsByInstitutionIdResponse,
  GetProjectsResponse,
  ProjectCategory,
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

export const deleteProject = async (id: number) => {
  const { data } = await api.delete<{ message: string }>(`/project/${id}`);
  return data;
};

export const getProjectCategories = async (
  query?: string
): Promise<ProjectCategory[]> => {
  const { data } = await api.get('/project/categories', {
    params: {
      search: query,
    },
  });
  return data;
};

export const createProject = async (
  data: CreateProjectData
): Promise<CreateProjectResponse> => {
  const formData = buildFormData(data as unknown as Record<string, unknown>);

  const response = await api.postForm('/project', formData);

  return response.data;
};
