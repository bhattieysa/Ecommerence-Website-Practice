import { apiClient } from './apiClient';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'CUSTOMER';
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: 'ADMIN' | 'CUSTOMER';
  isActive?: boolean;
  isVerified?: boolean;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: 'ADMIN' | 'CUSTOMER';
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  totalAmount: number;
  currency: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER' | 'CASH_ON_DELIVERY';
  shippingAddress: string;
  billingAddress?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  customer?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: {
    id: number;
    title: string;
    sku: string;
    slug: string;
    brand: string;
    price: number;
  };
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpdateOrderData {
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus?: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
}

export interface CreateOrderData {
  userId: number;
  items: Array<{ productId: number; quantity: number }>;
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER' | 'CASH_ON_DELIVERY';
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus?: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
}

export const adminService = {
  // User Management
  getAllUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }): Promise<UsersResponse> => {
    const response = await apiClient.axiosInstance.get<{ success: boolean; data: UsersResponse }>('/auth/users', { params });
    return response.data.data;
  },

  createUser: async (data: CreateUserData): Promise<User> => {
    const response = await apiClient.axiosInstance.post<{ success: boolean; data: User }>('/auth/users', data);
    return response.data.data;
  },

  updateUser: async (userId: number, data: UpdateUserData): Promise<User> => {
    const response = await apiClient.axiosInstance.patch<{ success: boolean; data: User }>(`/auth/users/${userId}`, data);
    return response.data.data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await apiClient.axiosInstance.delete(`/auth/users/${userId}`);
  },

  // Order Management
  getAllOrders: async (params?: {
    page?: number;
    limit?: number;
    paymentStatus?: string;
    orderStatus?: string;
    paymentMethod?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<OrdersResponse> => {
    const response = await apiClient.axiosInstance.get<{ success: boolean; data: OrdersResponse }>('/orders/all', { params });
    return response.data.data;
  },

  createOrder: async (data: CreateOrderData): Promise<Order> => {
    const response = await apiClient.axiosInstance.post<{ success: boolean; data: Order }>('/orders/admin', data);
    return response.data.data;
  },

  getOrderById: async (orderId: number): Promise<Order> => {
    const response = await apiClient.axiosInstance.get<{ success: boolean; data: Order }>(`/orders/${orderId}`);
    return response.data.data;
  },

  updateOrder: async (orderId: number, data: UpdateOrderData): Promise<Order> => {
    const response = await apiClient.axiosInstance.patch<{ success: boolean; data: Order }>(`/orders/${orderId}`, data);
    return response.data.data;
  },

  deleteOrder: async (orderId: number): Promise<void> => {
    await apiClient.axiosInstance.delete(`/orders/${orderId}`);
  },
};
