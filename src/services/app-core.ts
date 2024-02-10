import { banners } from 'src/mocks/app-banners-data';
import { allPosts } from 'src/mocks/app-posts-data';

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
