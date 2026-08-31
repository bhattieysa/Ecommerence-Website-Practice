import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: {
    url: string;
  };
  images?: string[];
  products?: any[];
  productsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

// Logical and array-based query keys for caching
export const categoryQueryKeys = {
  all: ['categories'] as const,
  lists: ['categories', 'list'] as const,
  details: ['categories', 'detail'] as const,
  list: (filters: string) => ['categories', 'list', filters] as const,
  detail: (id: string) => ['categories', 'detail', id] as const,
};


export const useCategories = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  const BACKEND_URL = API_BASE_URL.replace('/api', '');
  
  return useQuery({
    queryKey: categoryQueryKeys.lists,
    queryFn: async () => {
      const response = await categoryService.getAll();
      // Backend returns: { success: true, data: [...] }
      const categories = response.data || [];
      
      // Transform backend response to match frontend interface
      return categories.map((cat: any) => ({
        ...cat,
        image: cat.image ? (cat.image.url.startsWith('http') ? cat.image.url : `${BACKEND_URL}${cat.image.url}`) : null,
        images: cat.image ? [cat.image.url.startsWith('http') ? cat.image.url : `${BACKEND_URL}${cat.image.url}`] : [],
        productsCount: cat.products?.length || 0,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useCategory = (id: string) => {
  return useQuery({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: async () => {
      const response = await categoryService.getById(id);
      return response.data || response;
    },
    enabled: !!id, // Only fetch if ID is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategoryFormData) => {
      const response = await categoryService.create(data);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate categories list to trigger refetch
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Create category error:', error);
    },
  });
};


export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CategoryFormData;
    }) => {
      const response = await categoryService.update(id, data);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists });
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.detail(variables.id),
      });
    },
    onError: (error) => {
      console.error('Update category error:', error);
    },
  });
};


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await categoryService.delete(id);
      return id;
    },
    onSuccess: () => {
      // Invalidate categories list to trigger refetch
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Delete category error:', error);
    },
  });
};


export const useUploadCategoryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      categoryId,
      formData,
    }: {
      categoryId: string;
      formData: FormData;
    }) => {
      const response = await categoryService.uploadImage(categoryId, formData);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      // Invalidate category detail to show updated image
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.detail(variables.categoryId),
      });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Upload category image error:', error);
    },
  });
};


export const useUpdateCategoryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      categoryId,
      formData,
    }: {
      categoryId: string;
      formData: FormData;
    }) => {
      const response = await categoryService.updateImage(categoryId, formData);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      // Invalidate category detail to show updated image
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.detail(variables.categoryId),
      });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Update category image error:', error);
    },
  });
};

export const useDeleteCategoryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      await categoryService.deleteImage(categoryId);
      return categoryId;
    },
    onSuccess: (_, categoryId) => {
      // Invalidate category detail to show updated image
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.detail(categoryId),
      });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Delete category image error:', error);
    },
  });
};
