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
import { projects } from 'src/mocks/app-projects-data';
import { projectCategories } from 'src/mocks/app-projectsCategory-data';
import { IBanner, IProject } from 'src/types';

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
export async function getPosts(data) {
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

export async function getProjects(): Promise<IProject[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching projects...');
      resolve(projects);
    }, 1000);
  });
}

export async function getProjectById(id: number): Promise<IProject> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects.find((project) => project.id === id));
    }, 1000);
  });
}

export async function getInstituitionCategories(): Promise<ICategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching institutions categories...');
      resolve(institutionCategories);
    }, 1000);
  });
}

export async function getProjectCategories(): Promise<ICategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetchin project categories...');
      resolve(projectCategories);
    }, 1000);
  });
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

export async function getInstituitionProjects(
  institutionId: number
): Promise<IProject[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        projects.filter((project) => project.institutionId === institutionId)
      );
    }, 1000);
  });
}

export async function getInstitutionTransparency(institutionId: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
}

export async function getPartnerById(institutionId: number) {
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

export async function getVolunteersById(institutionId: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
}
