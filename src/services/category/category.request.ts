import api from '../api';

export type GetCategoriesReponse = {
  id: number;
  name: string;
}[];

export const getCategories = async () => {
  const { data } = await api.get<GetCategoriesReponse>('/account/categories');
  return data;
};
