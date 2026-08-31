import { apiClient } from './apiClient';

export const productService = {
  // Get all products with optional filters
  getAll: async (params?: any) => {
    const response = await apiClient.axiosInstance.get('/products', { params });
    return response.data;
  },

  // Get product by ID
  getById: async (id: string) => {
    const response = await apiClient.axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  create: async (data: any) => {
    const response = await apiClient.axiosInstance.post('/products', data);
    return response.data;
  },

  // Update product
  update: async (id: string, data: any) => {
    const response = await apiClient.axiosInstance.patch(
      `/products/${id}`,
      data,
    );
    return response.data;
  },

  // Delete product
  delete: async (id: string) => {
    await apiClient.axiosInstance.delete(`/products/${id}`);
  },

  // Upload product images
  uploadImages: async (productId: string, formData: FormData) => {
    const response = await apiClient.axiosInstance.post(
      `/products/${productId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  // Delete product image
  deleteImage: async (imageId: string) => {
    await apiClient.axiosInstance.delete(`/products/images/${imageId}`);
  },

  // Set primary image
  setPrimaryImage: async (imageId: string) => {
    await apiClient.axiosInstance.patch(`/products/images/${imageId}/primary`);
  },

  // Reorder images
  reorderImages: async (productId: string, imageIds: string[]) => {
    const response = await apiClient.axiosInstance.patch(
      `/products/${productId}/images/order`,
      {
        imageIds,
      },
    );
    return response.data;
  },
};
