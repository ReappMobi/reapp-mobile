import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PROJECTS_CATEGORIES_KEY, PROJECTS_PREFIX_KEY } from './keys';
import * as requests from './requests';

export const useGetProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_PREFIX_KEY],
    queryFn: requests.getProjects,
  });
};

export const useGetProjectById = (id: number) => {
  return useQuery({
    queryKey: [PROJECTS_PREFIX_KEY, id],
    queryFn: () => requests.getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_PREFIX_KEY] });
    },
  });
};

export const useToggleFavoriteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.toggleFavoriteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_PREFIX_KEY] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requests.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_PREFIX_KEY] });
    },
  });
};

export const useGetProjectCategories = (query?: string) => {
  return useQuery({
    queryKey: [PROJECTS_CATEGORIES_KEY, query],
    queryFn: () => requests.getProjectCategories(query),
  });
};

export const useGetFavoriteProjects = () => {
  return useQuery({
    queryKey: [PROJECTS_PREFIX_KEY, 'favorites'],
    queryFn: requests.getFavoriteProjects,
  });
};
