import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bannerService } from '../services/bannerService';

// ==================== TYPES ====================
export interface Banner {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  alignment?: string;
  imagePosition?: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannerFormData {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  alignment?: string;
  imagePosition?: string;
  category?: string;
  isActive?: boolean;
}

export const bannerQueryKeys = {
  all: ['banners'] as const,
  lists: ['banners', 'list'] as const,
  details: ['banners', 'detail'] as const,
  list: (filters: string) => ['banners', 'list', filters] as const,
  detail: (id: string) => ['banners', 'detail', id] as const,
};


export const useBanners = () => {
  return useQuery({
    queryKey: bannerQueryKeys.lists,
    queryFn: async () => {
      const response = await bannerService.getAll();
      // Backend returns: { success: true, data: [...] }
      return response.data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useBanner = (id: string) => {
  return useQuery({
    queryKey: bannerQueryKeys.detail(id),
    queryFn: async () => {
      const response = await bannerService.getById(id);
      return response.data || response;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};


export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BannerFormData) => {
      const response = await bannerService.create(data);
      return response.data || response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Create banner error:', error);
    },
  });
};


export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BannerFormData }) => {
      const response = await bannerService.update(id, data);
      return response.data || response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKeys.lists });
      queryClient.invalidateQueries({
        queryKey: bannerQueryKeys.detail(variables.id),
      });
    },
    onError: (error) => {
      console.error('Update banner error:', error);
    },
  });
};


export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await bannerService.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueryKeys.lists });
    },
    onError: (error) => {
      console.error('Delete banner error:', error);
    },
  });
};
