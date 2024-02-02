import { userDonations, userSavedPosts } from '../mocks/user-data';

export async function getDonations() {
  return userDonations;
}

export async function getSavedPosts() {
  return userSavedPosts;
}
