import { useState, useEffect } from 'react';
import { Box, Drawer, IconButton, Button, Divider, CircularProgress } from '@mui/material';
import { ICONS } from '@/components/IconButton/IconButton.constants';
import { Typography } from '@/components/Typography';
import { useCart } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCart, removeFromCart, removeFromCartBackend, updateQuantityBackend } from '@/store/slices/cartSlice';
import { CheckoutDrawer } from '@/components/CheckoutDrawer/CheckoutDrawer';
import toast from 'react-hot-toast';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onAuthRequired?: () => void;
}

export function CartDrawer({ open, onClose, onAuthRequired }: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { items, totalItems, totalPrice, dispatch, loading, error, updatingItemId } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (open) {
      dispatch(fetchCart());
    }
  }, [open, dispatch]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to checkout');
      onClose();
      onAuthRequired?.();
      return;
    }

    onClose();
    setIsCheckoutOpen(true);
  };

  const handleRemoveFromCart = (cartItemId: number | undefined, productId: string | number) => {
    if (cartItemId) {
      dispatch(removeFromCartBackend(cartItemId));
    } else {
      // Fallback to local action if no cartItemId (guest/local cart)
      dispatch(removeFromCart(String(productId)));
    }
  };

  const handleUpdateQuantity = (cartItemId: number | undefined, productId: string | number, quantity: number) => {
    if (cartItemId && quantity > 0) {
      dispatch(updateQuantityBackend({ cartItemId, quantity }));
    } else {
      // Fallback to local action if no cartItemId (guest/local cart)
      dispatch({ type: 'cart/updateQuantity', payload: { productId: String(productId), quantity } });
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            className: 'w-full max-w-md h-full',
            sx: {
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            },
          },
        }}
      >
        <Box className="flex flex-col h-full">
          {/* Header */}
          <Box className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Typography
                variant="h3"
                className="font-bold text-xl text-gray-900"
              >
                My Shopping Cart
              </Typography>
              {totalItems > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <IconButton
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ICONS.close className="h-6 w-6" />
            </IconButton>
          </Box>

          {/* Cart Items */}
          <Box className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <Box className="flex flex-col items-center justify-center h-full">
                <CircularProgress />
                <Typography variant="bodySm" className="mt-2 text-gray-500">
                  Loading cart...
                </Typography>
              </Box>
            ) : error ? (
              <Box className="flex flex-col items-center justify-center h-full text-red-500">
                <Typography variant="bodyLg" className="mb-2">
                  Error loading cart
                </Typography>
                <Typography variant="bodySm">
                  {error}
                </Typography>
              </Box>
            ) : items.length === 0 ? (
              <Box className="flex flex-col items-center justify-center h-full text-gray-500">
                <Typography variant="bodyLg" className="mb-2">
                  Your cart is empty
                </Typography>
                <Typography variant="bodySm">
                  Add some items to get started
                </Typography>
              </Box>
            ) : (
              <Box className="space-y-4">
                {items.map((item) => (
                  <Box
                    key={item.product.id}
                    className="flex gap-8 p-4 bg-gray-50 rounded-lg"
                  >
                    {/* Product Image */}
                    <Box className="shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden">
                      <img
                        src={item.product.image?.thumbnail?.src || '/placeholder.jpg'}
                        alt={item.product.image?.thumbnail?.alt || item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </Box>

                    {/* Product Details */}
                    <Box className="flex-1 flex flex-col">
                      <Typography
                        variant="bodyLg"
                        className="font-medium text-gray-900 mb-1 line-clamp-2"
                      >
                        {item.product.title}
                      </Typography>
                      <Typography
                        variant="bodyLg"
                        className="font-semibold text-gray-900 mb-2"
                      >
                        ${(
                          typeof item.product.price === 'number'
                            ? item.product.price
                            : item.product.price.current
                        ).toFixed(2)}
                      </Typography>

                      {/* Quantity and Remove */}
                      <Box className="flex items-center justify-between mt-auto">
                        <Box className="flex items-center gap-2 border border-gray-300 rounded-2xl bg-gray-100">
                          <IconButton
                            onClick={() =>
                              handleUpdateQuantity(item.cartItemId, item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-100"
                            disabled={loading || updatingItemId === item.cartItemId}
                          >
                            <ICONS.remove className="h-4 w-4" />
                          </IconButton>
                          <Typography
                            variant="bodyLg"
                            className="font-medium w-8 text-center"
                          >
                            {updatingItemId === item.cartItemId ? (
                              <CircularProgress size={16} />
                            ) : (
                              item.quantity
                            )}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleUpdateQuantity(item.cartItemId, item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-100"
                            disabled={loading || updatingItemId === item.cartItemId}
                          >
                            <ICONS.add className="h-4 w-4" />
                          </IconButton>
                        </Box>

                        <IconButton
                          onClick={() => handleRemoveFromCart(item.cartItemId, item.product.id)}
                          disabled={loading || updatingItemId === item.cartItemId}
                        >
                          <ICONS.delete className="h-5 w-5 text-red-500 hover:text-red-700 hover:bg-red-50" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Footer with Checkout */}
          {items.length > 0 && (
            <>
              <Divider className="border-gray-200" />
              <Box className="p-6 bg-gray-50 space-y-4">
                <Box className="flex items-center justify-between">
                  <Typography
                    variant="body"
                    className="font-medium text-gray-700"
                  >
                    Subtotal
                  </Typography>
                  <Typography
                    variant="body"
                    className="font-bold text-xl text-gray-900"
                  >
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Checkout'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      <CheckoutDrawer
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
