import api from '../api';
import {
  GetProjectsResponse,
  ToggleFavoriteProjectResponse,
} from './project.types';

export const getProjects = async () => {
  const { data } = await api.get<GetProjectsResponse>('/project');
  return data;
};

export const toggleFavoriteProject = async (id: number) => {
  const { data } = await api.post<ToggleFavoriteProjectResponse>(
    `/project/toggle-favorite/${id}`,
    {}
  );
  return data;
};
