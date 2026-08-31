import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';
import { cartService, type CartItem as BackendCartItem } from '@/services/cartService';

export interface CartItem {
  product: Product;
  quantity: number;
  cartItemId?: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  updatingItemId?: number | null;
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  loading: false,
  error: null,
  updatingItemId: null,
};

// Helper function to convert backend cart item to frontend cart item
const convertBackendToFrontend = (backendItem: BackendCartItem, product: Product): CartItem => ({
  product,
  quantity: backendItem.quantity,
  cartItemId: backendItem.id,
});

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const backendCart = await cartService.getCart();
      const items: CartItem[] = backendCart.items.map((item) => {
        const product: Product = {
          id: item.product.id,
          sku: item.product.sku,
          slug: item.product.slug,
          title: item.product.title,
          brand: '',
          price: item.product.price,
          image: {
            thumbnail: {
              src: item.product.images[0]?.url || '',
              alt: item.product.title,
            },
          },
          category: {} as any,
          rating: { value: 0, reviewCount: 0 },
          inStock: item.product.stock > 0,
          stockQuantity: item.product.stock,
          flags: {},
        };
        return convertBackendToFrontend(item, product);
      });
      return items;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch cart');
    }
  },
);

export const addToCartBackend = createAsyncThunk(
  'cart/addToCartBackend',
  async (product: Product, { rejectWithValue }) => {
    try {
      const productId = typeof product.id === 'number' ? product.id : parseInt(String(product.id));
      await cartService.addToCart({ productId, quantity: 1 });
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add to cart');
    }
  },
);

export const updateQuantityBackend = createAsyncThunk(
  'cart/updateQuantityBackend',
  async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }, { rejectWithValue }) => {
    try {
      await cartService.updateCartItem(cartItemId, { quantity });
      return { cartItemId, quantity };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update quantity');
    }
  },
);

export const removeFromCartBackend = createAsyncThunk(
  'cart/removeFromCartBackend',
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      await cartService.removeFromCart(cartItemId);
      return cartItemId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove from cart');
    }
  },
);

export const clearCartBackend = createAsyncThunk(
  'cart/clearCartBackend',
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      cartSlice.caseReducers.persistCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
      cartSlice.caseReducers.persistCart(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );
      } else {
        const item = state.items.find((item) => item.product.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      cartSlice.caseReducers.persistCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      cartSlice.caseReducers.persistCart(state);
    },
    persistCart: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        cartSlice.caseReducers.persistCart(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to cart
      .addCase(addToCartBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.loading = false;
        const product = action.payload;
        const existingItem = state.items.find(
          (item) => item.product.id === product.id,
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ product, quantity: 1 });
        }
        cartSlice.caseReducers.persistCart(state);
      })
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update quantity (track per-item updating to avoid global loader)
      .addCase(updateQuantityBackend.pending, (state, action) => {
        state.updatingItemId = action.meta.arg.cartItemId;
        state.error = null;
      })
      .addCase(updateQuantityBackend.fulfilled, (state, action) => {
        state.updatingItemId = null;
        const { cartItemId, quantity } = action.payload;
        const item = state.items.find((item) => item.cartItemId === cartItemId);
        if (item) {
          item.quantity = quantity;
        }
        cartSlice.caseReducers.persistCart(state);
      })
      .addCase(updateQuantityBackend.rejected, (state, action) => {
        state.updatingItemId = null;
        state.error = action.payload as string;
      })
      // Remove from cart
      .addCase(removeFromCartBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartBackend.fulfilled, (state, action) => {
        state.loading = false;
        const cartItemId = action.payload;
        state.items = state.items.filter((item) => item.cartItemId !== cartItemId);
        cartSlice.caseReducers.persistCart(state);
      })
      .addCase(removeFromCartBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Clear cart
      .addCase(clearCartBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartBackend.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        cartSlice.caseReducers.persistCart(state);
      })
      .addCase(clearCartBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  persistCart,
  loadCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => {
    const price =
      typeof item.product.price === 'number'
        ? item.product.price
        : item.product.price.current;
    return total + price * item.quantity;
  }, 0);
export const selectCartLoading = (state: { cart: CartState }) => state.cart.loading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;

export default cartSlice.reducer;
