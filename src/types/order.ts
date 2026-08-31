export const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  PAYPAL: 'PAYPAL',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  product?: {
    id: number;
    title: string;
    sku: string;
    slug: string;
    brand: string;
    price: number;
    category?: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

export interface CreateOrderDto {
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  billingAddress?: string;
  notes?: string;
}

export interface UpdateOrderDto {
  paymentStatus?: PaymentStatus;
  orderStatus?: OrderStatus;
  notes?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  billingAddress?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  customer?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface OrderListResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
