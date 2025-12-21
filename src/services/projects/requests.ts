import { IProject } from 'src/types/IProject';
import api from '../api';
import {
  CreateProjectData,
  GetProjectsResponse,
  ToggleFavoriteProjectData,
} from './types';

export const getProjects = async () => {
  const { data } = await api.get<GetProjectsResponse>('/project');
  return data;
};

export const getProjectById = async (projectId: number) => {
  const { data } = await api.get<IProject>(`/project/${projectId}`);
  return data;
};

export const createProject = async (projectData: CreateProjectData) => {
  const formData = new FormData();
  for (const key in projectData) {
    if (key === 'media') {
      formData.append('media', {
        uri: projectData.media,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
      continue;
    }
    // @ts-ignore
    formData.append(key, projectData[key]);
  }

  const { data } = await api.post('/project', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const toggleFavoriteProject = async ({
  projectId,
}: ToggleFavoriteProjectData) => {
  const { data } = await api.post(`/project/toggle-favorite/${projectId}`);
  return data;
};

export const deleteProject = async (id: number) => {
  const { data } = await api.delete(`/project/${id}`);
  return data;
};

export const getProjectCategories = async (query?: string) => {
  const { data } = await api.get('/project/categories', {
    params: { search: query },
  });
  return data;
};

export const getFavoriteProjects = async () => {
  const { data } = await api.get<GetProjectsResponse>('/project/favorite/');
  return data;
};
