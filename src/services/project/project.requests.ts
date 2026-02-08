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

export const getFavoriteProjects = async () => {
  const { data } = await api.get<GetProjectsResponse>('/project/favorite');
  return data;
};

export const createProject = async (
  data: CreateProjectData
): Promise<CreateProjectResponse> => {
  const formData = buildFormData(data as unknown as Record<string, unknown>);

  // Special handling for media in React Native
  if (data.media) {
    formData.delete('media');
    const timestamp = Date.now();
    formData.append('media', {
      uri: data.media,
      name: `${timestamp}.jpg`,
      type: 'image/jpeg',
    } as any);
  }

  const response = await api.postForm('/project', formData);

  return response.data;
};
