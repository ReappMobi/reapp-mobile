import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './api';

export async function getFavoritesProjects(_donorId: number, token) {
  try {
    const response = await api.get(`/project/favorite/`, {
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

export async function editInstitutionInformation(data) {
  try {
    const formData = new FormData();
    if (data.name) { formData.append('name', data.name); }
    if (data.institutionId) {
      formData.append('institutionId', data.institutionId);
    }
    if (data.phone) { formData.append('phone', data.phone); }
    if (data.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: data.image,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.patch('/institution/editInformation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    if (response.data) {
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function editDonorInformation(data) {
  try {
    const formData = new FormData();
    if (data.name) { formData.append('name', data.name); }
    if (data.donorId) { formData.append('donorId', data.donorId); }
    if (data.phone) { formData.append('phone', data.phone); }
    if (data.image) {
      const timestamp = Date.now();
      formData.append('image', {
        uri: data.image,
        name: `${timestamp}.jpg`,
        type: 'image/jpeg',
      } as any);
    }

    const response = await api.patch('/donnor/editInformation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${data.token}`,
      },
      validateStatus() {
        return true;
      },
    });
    if (response.data) {
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}
