import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

// Cart hooks
export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart?.items ?? []);
  const totalItems = useAppSelector((state) =>
    (state.cart?.items ?? []).reduce((total, item) => total + item.quantity, 0),
  );
  const totalPrice = useAppSelector((state) =>
    (state.cart?.items ?? []).reduce((total, item) => {
      const price =
        typeof item.product.price === 'number'
          ? item.product.price
          : item.product.price.current;
      return total + price * item.quantity;
    }, 0),
  );
  const loading = useAppSelector((state) => state.cart?.loading ?? false);
  const error = useAppSelector((state) => state.cart?.error ?? null);
  const updatingItemId = useAppSelector((state) => state.cart?.updatingItemId ?? null);

  return {
    items,
    totalItems,
    totalPrice,
    loading,
    error,
    updatingItemId,
    dispatch,
  };
};

// Orders hooks
export const useOrders = () => {
  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector((state: any) => state.orders?.currentOrder);
  const orders = useAppSelector((state: any) => state.orders?.orders || []);
  const loading = useAppSelector((state: any) => state.orders?.loading || false);
  const error = useAppSelector((state: any) => state.orders?.error || null);
  const pagination = useAppSelector((state: any) => state.orders?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  return {
    currentOrder,
    orders,
    loading,
    error,
    pagination,
    dispatch,
  };
};
