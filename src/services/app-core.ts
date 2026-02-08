import { IBanner } from '@/types';
import api from './api';

export async function getPosts(data: { token: string }) {
  try {
    const response = await api.get('/post', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data.error.message || 'Erro ao buscar posts');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(error.message);
  }
}

export async function likePost(data: { id: number; token: string }) {
  try {
    const response = await api.post(
      `/post/${data.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        validateStatus() {
          return true;
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function unlikePost(data: { id: number; token: string }) {
  try {
    const response = await api.delete(`/post/${data.id}/like`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function savePost(data: { id: number; token: string }) {
  try {
    const response = await api.post(
      `/post/${data.id}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        validateStatus() {
          return true;
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function unsavePost(data: { id: number; token: string }) {
  try {
    const response = await api.delete(`/post/${data.id}/save`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getSavedPosts(data: { token: string }) {
  try {
    const response = await api.get(`/post/saved`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getInstitutions(data) {
  try {
    const response = await api.get('/account/institution', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getInstitutionByAccountId(
  accountId: number,
  token: string
) {
  try {
    const response = await api.get(`/account/institution/${accountId}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function postPublication(postData: {
  content: string;
  media: string;
  token: string;
}) {
  try {
    const formData = new FormData();
    formData.append('content', postData.content);
    if (postData.media) {
      const timestamp = Date.now();
      formData.append('media', {
        uri: postData.media,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.post('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${postData.token}`,
      },
      validateStatus() {
        return true;
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function toggleFavoriteProject(data: {
  projectId: number;
  token: string;
}) {
  try {
    const response = await api.post(
      `/project/toggle-favorite/${data.projectId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        validateStatus() {
          return true;
        },
      }
    );

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function postProject(projectData) {
  try {
    const formData = new FormData();
    formData.append('description', projectData.description);
    formData.append('name', projectData.name);
    formData.append('institutionId', projectData.institutionId);
    formData.append('categoryId', projectData.categoryId);
    formData.append('subtitle', projectData.subtitle);
    if (projectData.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: projectData.image,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.post('/project', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${projectData.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProjects(token: string) {
  try {
    const response = await api.get(`/project`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProjectById(projectId: number, token: string) {
  try {
    const response = await api.get(`/project/${projectId}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProjectByInstitutionId(
  institutionId: number,
  token: string
) {
  try {
    const response = await api.get(`/project/institution/${institutionId}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getProjectCategories(data) {
  try {
    const response = await api.get(`/project/categories`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getInstitutionTransparency(_institutionId: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
}

export async function getInstitutionCategories() {
  try {
    const response = await api.get('/account/categories', {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      validateStatus() {
        return true;
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
}

export async function getVolunteerById(institutionId, token) {
  const response = await api.get(`/volunteer/${institutionId}`);
  return response.data;
}