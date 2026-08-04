import { useState } from 'react';
import { Box, Drawer, IconButton, Button, Divider } from '@mui/material';
import { ICONS } from '@/components/IconButton/IconButton.constants';
import { Typography } from '@/components/Typography';
import { useCart } from '@/contexts/CartContext';
import { CheckoutDrawer } from '@/components/CheckoutDrawer/CheckoutDrawer';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const handleCheckout = () => {
    onClose();
    setIsCheckoutOpen(true);
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
              {getTotalItems() > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
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
            {items.length === 0 ? (
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
                        src={item.product.image.thumbnail.src}
                        alt={item.product.image.thumbnail.alt}
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
                        ${item.product.price.current.toFixed(2)}
                      </Typography>

                      {/* Quantity and Remove */}
                      <Box className="flex items-center justify-between mt-auto">
                        <Box className="flex items-center gap-2 border border-gray-300 rounded-2xl bg-gray-100">
                          <IconButton
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <ICONS.remove className="h-4 w-4" />
                          </IconButton>
                          <Typography
                            variant="bodyLg"
                            className="font-medium w-8 text-center"
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <ICONS.add className="h-4 w-4" />
                          </IconButton>
                        </Box>

                        <IconButton
                          onClick={() => removeFromCart(item.product.id)}
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
                    ${getTotalPrice().toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
                  onClick={handleCheckout}
                >
                  Checkout
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
