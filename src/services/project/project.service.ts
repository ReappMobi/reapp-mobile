import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  getProjectById,
  getProjects,
  getProjectsByInstitutionId,
  toggleFavoriteProject,
} from './project.requests';
import {
  GetProjectByIdResponse,
  GetProjectsByInstitutionIdResponse,
  GetProjectsResponse,
  ToggleFavoriteProjectResponse,
} from './project.types';

export const GET_PROJECTS_KEY = 'get-projects';
export const GET_PROJECT_BY_ID_KEY = 'get-project-by-id';
export const GET_PROJECTS_BY_INSTITUTION_ID_KEY =
  'get-projects-by-institution-id';

export function useGetProjects(
  options?: UseQueryOptions<GetProjectsResponse, Error>
) {
  return useQuery({
    queryKey: [GET_PROJECTS_KEY],
    queryFn: getProjects,
    ...options,
  });
}

export function useGetProjectById(
  id: number,
  options?: Omit<UseQueryOptions<GetProjectByIdResponse, Error>, 'queryKey'>
) {
  return useQuery({
    queryKey: [GET_PROJECT_BY_ID_KEY, id],
    queryFn: () => getProjectById(id),
    ...options,
  });
}

export function useGetProjectsByInstitutionId(
  institutionId: number,
  options?: UseQueryOptions<GetProjectsByInstitutionIdResponse, Error>
) {
  return useQuery({
    queryKey: [GET_PROJECTS_BY_INSTITUTION_ID_KEY, institutionId],
    queryFn: () => getProjectsByInstitutionId(institutionId),
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
