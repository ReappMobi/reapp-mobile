import {
  ICategory,
  institutionCategories,
} from 'src/mocks/app-InstitutionCategory-data';
import { banners } from 'src/mocks/app-banners-data';
import { donationsByEixo } from 'src/mocks/app-donationEixo-data';
import { donationsBySegment } from 'src/mocks/app-donationSegment-data';
import { institutions } from 'src/mocks/app-institution-data';
import { allPosts } from 'src/mocks/app-posts-data';
import { projects } from 'src/mocks/app-projects-data';
import { projectCategories } from 'src/mocks/app-projectsCategory-data';

export async function getSharedCampaigns() {
  setTimeout(() => {
    console.log('fetchin banners...');
  }, 2000);
  return banners;
}

export async function getPosts() {
  setTimeout(() => {
    console.log('fetchin posts...');
  }, 5000);
  return allPosts;
}

export async function getProjects() {
  setTimeout(() => {
    console.log('fetchin projects...');
  }, 5000);
  return projects;
}

export async function getInstitutions() {
  setTimeout(() => {
    console.log('fetchin institutions...');
  }, 5000);
  return institutions;
}

export async function getInstituitionCategories() {
  setTimeout(() => {
    console.log('fetchin institution categories...');
  }, 5000);
  return institutionCategories;
}

export async function getProjectCategories() {
  setTimeout(() => {
    console.log('fetchin project categories...');
  }, 5000);
  return projectCategories;
}

export async function getDonationsByEixo() {
  setTimeout(() => {
    console.log('fetchin donations by eixo...');
  }, 5000);
  return donationsByEixo;
}

export async function getDonationsBySegment() {
  setTimeout(() => {
    console.log('fetchin donations by segment...');
  }, 5000);
  return donationsBySegment;
}

export async function getCategoryById(id: number): Promise<ICategory> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(institutionCategories.find((category) => category.id === id));
    }, 1000);
  });
}
