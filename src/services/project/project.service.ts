import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { getProjects, toggleFavoriteProject } from './project.requests';
import {
  GetProjectsResponse,
  ToggleFavoriteProjectResponse,
} from './project.types';

export const GET_PROJECTS_KEY = 'get-projects';

export function useGetProjects(
  options?: UseQueryOptions<GetProjectsResponse, Error>
) {
  return useQuery({
    queryKey: [GET_PROJECTS_KEY],
    queryFn: getProjects,
    ...options,
  });
}

export function useToggleFavoriteProject(
  options?: UseMutationOptions<ToggleFavoriteProjectResponse, Error, number>
) {
  return useMutation({
    mutationFn: toggleFavoriteProject,
    ...options,
  });
}
