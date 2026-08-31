import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { orderService } from '@/services/orderService';
import type {
  Order,
  OrderListResponse,
  CreateOrderDto,
  UpdateOrderDto,
} from '@/types/order';

export interface OrdersState {
  currentOrder: Order | null;
  orders: Order[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const initialState: OrdersState = {
  currentOrder: null,
  orders: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: CreateOrderDto, { rejectWithValue }) => {
    try {
      const order = await orderService.createOrder(orderData);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create order');
    }
  },
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (orderId: number, { rejectWithValue }) => {
    try {
      const order = await orderService.getOrderById(orderId);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch order');
    }
  },
);

export const getOrderByOrderNumber = createAsyncThunk(
  'orders/getOrderByOrderNumber',
  async (orderNumber: string, { rejectWithValue }) => {
    try {
      const order = await orderService.getOrderByOrderNumber(orderNumber);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch order');
    }
  },
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await orderService.getUserOrders();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  },
);

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await orderService.getAllOrders();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  },
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (
    { orderId, updateData }: { orderId: number; updateData: UpdateOrderDto },
    { rejectWithValue },
  ) => {
    try {
      const order = await orderService.updateOrder(orderId, updateData);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update order');
    }
  },
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: number, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(orderId);
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete order');
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.error = null;
      state.pagination = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Order By Order Number
      .addCase(getOrderByOrderNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByOrderNumber.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByOrderNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<OrderListResponse>) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<OrderListResponse>) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
        if (state.currentOrder?.id === action.payload) {
          state.currentOrder = null;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder, clearError, resetOrders } = ordersSlice.actions;

export const selectCurrentOrder = (state: { orders: OrdersState }) => state.orders.currentOrder;
export const selectOrders = (state: { orders: OrdersState }) => state.orders.orders;
export const selectOrdersLoading = (state: { orders: OrdersState }) => state.orders.loading;
export const selectOrdersError = (state: { orders: OrdersState }) => state.orders.error;
export const selectOrdersPagination = (state: { orders: OrdersState }) => state.orders.pagination;

export default ordersSlice.reducer;
