import { apiClient } from './apiClient';

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    sku: string;
    slug: string;
    price: number;
    stock: number;
    images: Array<{
      id: number;
      url: string;
      isPrimary: boolean;
    }>;
  };
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddToCartDto {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export const cartService = {
  // Get user's cart
  getCart: async (): Promise<Cart> => {
    const response = await apiClient.axiosInstance.get<{ success: boolean; data: Cart }>('/cart');
    return response.data.data;
  },

  // Add item to cart
  addToCart: async (data: AddToCartDto): Promise<Cart> => {
    const response = await apiClient.axiosInstance.post<{ success: boolean; data: Cart }>('/cart', data);
    return response.data.data;
  },

  // Update cart item quantity
  updateCartItem: async (cartItemId: number, data: UpdateCartItemDto): Promise<Cart> => {
    const response = await apiClient.axiosInstance.patch<{ success: boolean; data: Cart }>(`/cart/${cartItemId}`, data);
    return response.data.data;
  },

  // Remove item from cart
  removeFromCart: async (cartItemId: number): Promise<Cart> => {
    const response = await apiClient.axiosInstance.delete<{ success: boolean; data: Cart }>(`/cart/${cartItemId}`);
    return response.data.data;
  },

  // Clear entire cart
  clearCart: async (): Promise<Cart> => {
    const response = await apiClient.axiosInstance.delete<{ success: boolean; data: Cart }>('/cart/clear/all');
    return response.data.data;
  },

  // Get cart summary
  getCartSummary: async (): Promise<CartSummary> => {
    const response = await apiClient.axiosInstance.get<{ success: boolean; data: CartSummary }>('/cart/summary');
    return response.data.data;
  },
};
