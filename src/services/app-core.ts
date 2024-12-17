import {
  ICategory,
  institutionCategories,
} from 'src/mocks/app-InstitutionCategory-data';
import { banners } from 'src/mocks/app-banners-data';
import {
  IDonationEixo,
  donationsByEixo,
} from 'src/mocks/app-donationEixo-data';
import {
  IDonationSegment,
  donationsBySegment,
} from 'src/mocks/app-donationSegment-data';
import { IBanner } from 'src/types';

import api from './api';

export async function getSharedCampaigns(): Promise<IBanner[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching banners...');
      resolve(banners);
    }, 1000);
  });
}

/**TODO: fix Post type in this function */
export async function getPosts(data: { token: string }) {
  try {
    const response = await api.get('/post', {
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

export async function getInstitutions(data) {
  try {
    const response = await api.get('/institution', {
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

export async function getInstitutionById(institutionId: number, token: string) {
  try {
    const response = await api.get(`/institution/${institutionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function postPublication(postData) {
  try {
    const formData = new FormData();
    formData.append('caption', postData.caption);
    formData.append('institutionId', postData.institutionId);
    if (postData.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: postData.image,
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

export async function postPartner(data, token) {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('institutionId', data.institutionId);
    if (data.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: data.image,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.post('/partner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
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

export async function getPartnerById(institutionId, token) {
  try {
    const response = await api.get(`/partner/${institutionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function postCollaborator(data, token) {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('institutionId', data.institutionId);
    if (data.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: data.image,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.post('/collaborator', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
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

export async function getCollaboratorById(institutionId, token) {
  try {
    const response = await api.get(`/collaborator/${institutionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function toggleFavoriteProject(data) {
  try {
    const response = await api.post('/project/toggle-favorite', data, {
      headers: {
        'Content-Type': 'application/json',
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

export async function getProjects(data, token) {
  try {
    const response = await api.get(`/project`, {
      params: {
        isDonor: data.isDonor,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export async function getProjectById(projectId: number, token: string) {
  try {
    const response = await api.get(`/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function getProjectByInstitutionId(
  institutionId: number,
  token: string
) {
  try {
    const response = await api.get(`/project/institution/${institutionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function getDonationsByEixo(): Promise<IDonationEixo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetchin donations by field...');
      resolve(donationsByEixo);
    }, 1000);
  });
}

export async function getDonationsBySegment(): Promise<IDonationSegment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetchin donations by segment...');
      resolve(donationsBySegment);
    }, 5000);
  });
}

export async function getCategoryById(id: number): Promise<ICategory> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(institutionCategories.find((category) => category.id === id));
    }, 1000);
  });
}

export async function getInstituitionPosts(
  institutionId: number,
  token: string
) {
  try {
    const response = await api.get(`/post/${institutionId}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
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

export async function getInstitutionTransparency(institutionId: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
}

export async function getCollaboratorsById(institutionId: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
}

export async function getInstitutionCategories() {
  try {
    const response = await api.get('/institution/categories', {
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

export async function postVolunteer(data, token) {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('institutionId', data.institutionId);
    if (data.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: data.image,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.post('/volunteer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
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

export async function getVolunteerById(institutionId, token) {
  try {
    const response = await api.get(`/volunteer/${institutionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
