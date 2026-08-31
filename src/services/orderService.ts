import { apiClient } from './apiClient';
import type {
  CreateOrderDto,
  Order,
  OrderListResponse,
  UpdateOrderDto,
} from '@/types/order';

class OrderService {
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await apiClient.axiosInstance.post('/orders', orderData);
    return response.data.data;
  }

  async getOrderById(orderId: number): Promise<Order> {
    const response = await apiClient.axiosInstance.get(`/orders/${orderId}`);
    return response.data.data;
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<Order> {
    const response = await apiClient.axiosInstance.get(
      `/orders/number/${orderNumber}`,
    );
    return response.data.data;
  }

  async getUserOrders(params?: {
    page?: number;
    limit?: number;
    paymentStatus?: string;
    orderStatus?: string;
    paymentMethod?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<OrderListResponse> {
    const response = await apiClient.axiosInstance.get('/orders/my-orders', {
      params,
    });
    return response.data.data;
  }

  async getAllOrders(params?: {
    page?: number;
    limit?: number;
    paymentStatus?: string;
    orderStatus?: string;
    paymentMethod?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<OrderListResponse> {
    const response = await apiClient.axiosInstance.get('/orders/all', {
      params,
    });
    return response.data.data;
  }

  async updateOrder(
    orderId: number,
    updateData: UpdateOrderDto,
  ): Promise<Order> {
    const response = await apiClient.axiosInstance.patch(
      `/orders/${orderId}`,
      updateData,
    );
    return response.data.data;
  }

  async deleteOrder(orderId: number): Promise<void> {
    await apiClient.axiosInstance.delete(`/orders/${orderId}`);
  }
}

export const orderService = new OrderService();
