import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { GetCategoriesReponse, getCategories } from './category.request';

export const GET_CATEGORIES_KEY = 'categories';

export const useGetCategories = (
  options?: UseQueryOptions<GetCategoriesReponse>
) => {
  return useQuery({
    queryFn: getCategories,
    queryKey: [GET_CATEGORIES_KEY],
    ...options,
  });
};
