import { Category } from 'src/types/ICategory';

import api from './api';

export const getProjectsCategories = async (
  query: string
): Promise<Category[]> => {
  try {
    const response = await api.get('/project/categories', {
      params: {
        search: query,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Erro ao buscar categorias de projetos');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
