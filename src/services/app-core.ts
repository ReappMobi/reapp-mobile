import { banners } from 'src/mocks/app-banners-data';

export async function getSharedCampaigns() {
  setTimeout(() => {
    console.log('fetchin banners...');
  }, 2000);
  return banners;
}
