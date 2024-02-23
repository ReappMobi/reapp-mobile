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
import { institutions } from 'src/mocks/app-institution-data';
import { posts } from 'src/mocks/app-institution-post-data';
import { allPosts } from 'src/mocks/app-posts-data';
import { projects } from 'src/mocks/app-projects-data';
import { projectCategories } from 'src/mocks/app-projectsCategory-data';
import { IBanner, IInstitution, IPost, IProject } from 'src/types';

export async function getSharedCampaigns(): Promise<IBanner[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching banners...');
      resolve(banners);
    }, 1000);
  });
}

/**TODO: fix Post type in this function */
export async function getPosts(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching posts...');
      resolve(allPosts);
    }, 1000);
  });
}

export async function getProjects(): Promise<IProject[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching projects...');
      resolve(projects);
    }, 1000);
  });
}

export async function getInstitutions(): Promise<IInstitution[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching institutions...');
      resolve(institutions);
    }, 1000);
  });
}

export async function getInstituitionCategories(): Promise<ICategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching institutions...');
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
  institutionId: number
): Promise<IPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 1000);
  });
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
