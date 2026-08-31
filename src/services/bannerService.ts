import { apiClient } from './apiClient';

export const bannerService = {
  // Get all banners
  getAll: async () => {
    const response = await apiClient.axiosInstance.get('/banners');
    return response.data;
  },

  // Get banner by ID
  getById: async (id: string) => {
    const response = await apiClient.axiosInstance.get(`/banners/${id}`);
    return response.data;
  },

  // Create new banner
  create: async (data: any) => {
    const response = await apiClient.axiosInstance.post('/banners', data);
    return response.data;
  },

  // Update banner
  update: async (id: string, data: any) => {
    const response = await apiClient.axiosInstance.patch(`/banners/${id}`, data);
    return response.data;
  },

  // Delete banner
  delete: async (id: string) => {
    await apiClient.axiosInstance.delete(`/banners/${id}`);
  },
};
