import api from '../api';
import { EditDonorData, EditInstitutionData, UpdateAccountData } from './types';

export const updateAccount = async ({
  accountId,
  data,
}: {
  accountId: number;
  data: UpdateAccountData;
}) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === 'media') {
      if (data.media) {
        formData.append('media', data.media);
      }
      continue;
    }
    if (data[key]) {
      // @ts-ignore
      formData.append(key, data[key]);
    }
  }

  const { data: responseData } = await api.put(
    `/account/${accountId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return responseData;
};

export const editInstitutionInformation = async (data: EditInstitutionData) => {
  const formData = new FormData();
  if (data.name) {
    formData.append('name', data.name);
  }
  if (data.institutionId) {
    formData.append('institutionId', String(data.institutionId));
  }
  if (data.phone) {
    formData.append('phone', data.phone);
  }
  if (data.image) {
    const timestamp = Date.now();
    formData.append('image', {
      uri: data.image,
      name: `${timestamp}.jpg`,
      type: 'image/jpeg',
    } as any);
  }

  const { data: responseData } = await api.patch(
    '/institution/editInformation',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return responseData;
};

export const editDonorInformation = async (data: EditDonorData) => {
  const formData = new FormData();
  if (data.name) {
    formData.append('name', data.name);
  }
  if (data.donorId) {
    formData.append('donorId', String(data.donorId));
  }
  if (data.phone) {
    formData.append('phone', data.phone);
  }
  if (data.image) {
    const timestamp = Date.now();
    formData.append('image', {
      uri: data.image,
      name: `${timestamp}.jpg`,
      type: 'image/jpeg',
    } as any);
  }

  const { data: responseData } = await api.patch(
    '/donnor/editInformation',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return responseData;
};

export const followAccount = async (id: number) => {
  const { data } = await api.post(`/account/follow/${id}`);
  return data;
};

export const unfollowAccount = async (id: number) => {
  const { data } = await api.delete(`/account/unfollow/${id}`);
  return data;
};

export const getInstitutionCategories = async () => {
  const { data } = await api.get('/account/categories');
  return data;
};
