import { ApiResponseError } from 'src/errors/ApiResponseError';
import { ApiErrorResponse } from 'src/types/IApiResponseError';
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

type CreateProject = {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  media: string;
};

type CreateProjectResponse = {
  description: string;
  name: string;
  media: string;
  subtitle: string;
  category: Category;
  institutionId: number;
  accountId: number;
};

export const createProject = async (
  token: string,
  data: CreateProject
): Promise<[CreateProjectResponse | null, ApiErrorResponse | Error | null]> => {
  const formData = new FormData();
  for (const key in data) {
    if (key === 'media') {
      formData.append('media', {
        uri: data[key],
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
      continue;
    }
    formData.append(key, data[key]);
  }

  try {
    const response = await api.post('/project', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 201) {
      const { error, message, statusCode } = response.data;
      throw new ApiResponseError(error, message, statusCode);
    }
    return [response.data, null];
  } catch (error) {
    console.log(error);
    if (error instanceof ApiResponseError) {
      return [null, error];
    }
    return [null, new Error('Erro ao criar projeto')];
  }
};
