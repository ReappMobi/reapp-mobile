import {
  userDonations,
  userSavedPosts,
  userFavoritesInstitutions,
} from '../mocks/user-data';

export async function getDonations() {
  return userDonations;
}

export async function getSavedPosts() {
  return userSavedPosts;
}

export async function getFavoritesInstitutions() {
  return userFavoritesInstitutions;
}
