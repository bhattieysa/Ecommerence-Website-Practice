import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

export type ProductStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

export interface Product {
  id: number;
  sku: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status: ProductStatus;
  featured: boolean;
  flashSale: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  trending: boolean;
  averageRating: number;
  reviewCount: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  images: Array<{
    id: number;
    url: string;
    isPrimary: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  sku: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId: number;
  brand: string;
  featured?: boolean;
  flashSale?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  trending?: boolean;
}

// Logical and array-based query keys for caching
export const productQueryKeys = {
  all: ['products'] as const,
  lists: ['products', 'list'] as const,
  details: ['products', 'detail'] as const,
  list: (filters: string) => ['products', 'list', filters] as const,
  detail: (id: string) => ['products', 'detail', id] as const,
};



export const useProducts = (params?: any) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  const BACKEND_URL = API_BASE_URL.replace('/api', '');
  
  return useQuery({
    queryKey: params
      ? productQueryKeys.list(JSON.stringify(params))
      : productQueryKeys.lists,
    queryFn: async () => {
      const response = await productService.getAll(params);
    
      // Backend returns: { success: true, data: { data: [...], pagination: {...} } }
      const products = response.data?.data?.data || response.data?.data || response.data || [];
      
      // Transform backend response to match frontend interface
      return products.map((product: any) => ({
        ...product,
        images: product.images?.map((img: any) => ({
          ...img,
          url: img.url.startsWith('http') ? img.url : `${BACKEND_URL}${img.url}`
        })) || []
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: async () => {
      const response = await productService.getById(id);
      return response.data || response;
    },
    enabled: !!id, // Only fetch if ID is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      const response = await productService.create(data);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate products list to trigger refetch
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Create product error:', error);
    },
  });
};


export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductFormData }) => {
      const response = await productService.update(id, data);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.detail(variables.id),
      });
    },
    onError: (error) => {
      console.error('Update product error:', error);
    },
  });
};


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await productService.delete(id);
      return id;
    },
    onSuccess: () => {
      // Invalidate products list to trigger refetch
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Delete product error:', error);
    },
  });
};


export const useUploadProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      formData,
    }: {
      productId: string;
      formData: FormData;
    }) => {
      const response = await productService.uploadImages(productId, formData);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      // Invalidate product detail to show updated images
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.detail(variables.productId),
      });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Upload product images error:', error);
    },
  });
};


export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) => {
      await productService.deleteImage(imageId);
      return imageId;
    },
    onSuccess: () => {
      // Invalidate products list to trigger refetch
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Delete product image error:', error);
    },
  });
};

export const useSetPrimaryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) => {
      await productService.setPrimaryImage(imageId);
      return imageId;
    },
    onSuccess: () => {
      // Invalidate products list to trigger refetch
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Set primary image error:', error);
    },
  });
};


export const useReorderProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      imageIds,
    }: {
      productId: string;
      imageIds: string[];
    }) => {
      const response = await productService.reorderImages(productId, imageIds);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      // Invalidate product detail to show updated image order
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.detail(variables.productId),
      });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Reorder product images error:', error);
    },
  });
};
