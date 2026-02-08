import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectCategories,
  getProjects,
  getProjectsByInstitutionId,
  toggleFavoriteProject,
} from './project.requests';
import {
  CreateProjectData,
  CreateProjectResponse,
  GetProjectByIdResponse,
  GetProjectsByInstitutionIdResponse,
  GetProjectsResponse,
  ProjectCategory,
  ToggleFavoriteProjectResponse,
} from './project.types';

export const GET_PROJECTS_KEY = 'get-projects';
export const GET_PROJECT_BY_ID_KEY = 'get-project-by-id';
export const GET_PROJECTS_BY_INSTITUTION_ID_KEY =
  'get-projects-by-institution-id';
export const GET_PROJECT_CATEGORIES_KEY = 'get-project-categories';

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
    enabled: !!institutionId,
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

export function useDeleteProject(
  options?: UseMutationOptions<{ message: string }, Error, number>
) {
  return useMutation({
    mutationFn: deleteProject,
    ...options,
  });
}

export function useGetProjectCategories(
  query?: string,
  options?: UseQueryOptions<ProjectCategory[], Error>
) {
  return useQuery({
    queryKey: [GET_PROJECT_CATEGORIES_KEY, query],
    queryFn: () => getProjectCategories(query),
    ...options,
  });
}

export function useCreateProject(
  options?: UseMutationOptions<CreateProjectResponse, Error, CreateProjectData>
) {
  return useMutation({
    mutationFn: createProject,
    ...options,
  });
}
