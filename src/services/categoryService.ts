import { apiClient } from './apiClient';

export const categoryService = {
  // Get all categories
  getAll: async () => {
    const response = await apiClient.axiosInstance.get('/categories');
    return response.data;
  },

  // Get category by ID
  getById: async (id: string) => {
    const response = await apiClient.axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  // Create new category
  create: async (data: any) => {
    const response = await apiClient.axiosInstance.post('/categories', data);
    return response.data;
  },

  // Update category
  update: async (id: string, data: any) => {
    const response = await apiClient.axiosInstance.patch(
      `/categories/${id}`,
      data,
    );
    return response.data;
  },

  // Delete category
  delete: async (id: string) => {
    await apiClient.axiosInstance.delete(`/categories/${id}`);
  },

  // Upload category image
  uploadImage: async (categoryId: string, formData: FormData) => {
    const response = await apiClient.axiosInstance.post(
      `/categories/${categoryId}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  // Update category image
  updateImage: async (categoryId: string, formData: FormData) => {
    const response = await apiClient.axiosInstance.patch(
      `/categories/${categoryId}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  // Delete category image
  deleteImage: async (categoryId: string) => {
    await apiClient.axiosInstance.delete(`/categories/${categoryId}/image`);
  },
};
