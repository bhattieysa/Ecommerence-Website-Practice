import { useState, Fragment } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { ICONS } from '@/components/IconButton/IconButton.constants';
import { Typography } from '@/components/Typography';
import { useCart } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { clearCart, clearCartBackend } from '@/store/slices/cartSlice';
import { createOrder } from '@/store/slices/ordersSlice';
import paypalIcon from '@/assets/icons/paypal-svgrepo-com.svg';
import toast from 'react-hot-toast';

type CheckoutStep = 'delivery' | 'payment' | 'confirmation';

interface CheckoutDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CheckoutDrawer({ open, onClose }: CheckoutDrawerProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');
  const [deliveryOption, setDeliveryOption] = useState('free');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalPrice, dispatch } = useCart();
  const { isAuthenticated } = useAuth();

  const deliveryOptions = [
    {
      id: 'free',
      label: 'Free',
      description: 'Delivered within 3-6 business days',
      price: 0,
    },
    {
      id: 'fast',
      label: 'Fast',
      description: 'Delivered within 2-4 business days',
      price: 0,
    },
    {
      id: 'express',
      label: 'Express',
      description: 'Delivered within 1-2 business days',
      price: 5.99,
    },
  ];

  const getDeliveryPrice = () => {
    const option = deliveryOptions.find((opt) => opt.id === deliveryOption);
    return option ? option.price : 0;
  };

  const getTotalWithDelivery = () => {
    return totalPrice + getDeliveryPrice();
  };

  const handleContinue = async () => {
    if (currentStep === 'delivery') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('confirmation');
    } else if (currentStep === 'confirmation') {
      await handleSubmitOrder();
    }
  };

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to place an order');
      return;
    }

    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: typeof item.product.id === 'number' ? item.product.id : parseInt(String(item.product.id)),
          quantity: item.quantity,
        })),
        paymentMethod: paymentMethod as any,
        shippingAddress,
        billingAddress: billingAddress || undefined,
        notes: notes || undefined,
      };

      const result = await dispatch(createOrder(orderData));

      if (createOrder.fulfilled.match(result)) {
        toast.success('Order created successfully!');
        try {
          await dispatch(clearCartBackend());
        } catch (err: any) {
          // Log but continue — clear frontend cart and close modal regardless
          // eslint-disable-next-line no-console
          console.error('Failed to clear backend cart:', err?.message || err);
        }

        dispatch(clearCart());

        // Notify other UI (e.g., CartDrawer in AppNavbar) to close if open
        try {
          window.dispatchEvent(new CustomEvent('megamar:closeCartDrawer'));
        } catch (e) {
          // ignore
        }

        onClose();
        setCurrentStep('delivery');
        setDeliveryOption('free');
        setPaymentMethod('CREDIT_CARD');
        setShippingAddress('');
        setBillingAddress('');
        setNotes('');
      } else {
        toast.error((result as any)?.payload as string || 'Failed to create order');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('delivery');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('payment');
    }
  };

  const renderStepIndicator = () => {
    const steps: Array<{ key: CheckoutStep; label: string }> = [
      { key: 'delivery', label: 'Delivery' },
      { key: 'payment', label: 'Payment' },
      { key: 'confirmation', label: 'Confirmation' },
    ];
    const currentStepIndex = steps.findIndex(
      (step) => step.key === currentStep,
    );

    const handleStepClick = (stepKey: CheckoutStep) => {
      const stepIndex = steps.findIndex((step) => step.key === stepKey);

      if (stepIndex >= 0 && stepIndex <= currentStepIndex) {
        setCurrentStep(stepKey);
      }
    };

    return (
      <Box className="flex items-center justify-between gap-2 pt-8 px-6 mb-4 w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === step.key;
          const isPast = currentStepIndex > index;
          const isClickable = Math.abs(index - currentStepIndex) <= 1;

          return (
            <Fragment key={step.key}>
              <Box
                className={`flex flex-col items-center flex-1 ${isClickable ? 'cursor-pointer' : ''}`}
                onClick={() => handleStepClick(step.key)}
              >
                <Box
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white scale-110'
                      : isPast
                        ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                  } ${isClickable ? 'hover:scale-105' : ''}`}
                >
                  {isPast ? '✓' : stepNumber}
                </Box>
                <Typography
                  variant="bodySm"
                  className={`mt-1 text-xs font-medium ${
                    isActive
                      ? 'text-blue-600'
                      : isPast
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </Typography>
              </Box>
              {index < steps.length - 1 && (
                <Box
                  className={`h-0.5 w-12 transition-all ${
                    isPast ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </Box>
    );
  };

  const renderDeliveryStep = () => (
    <Box className="space-y-4">
      <Box className="flex flex-col items-center justify-center py-8">
        <Box className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <ICONS.package className="h-16 w-16 text-blue-600" />
        </Box>
        <Typography variant="h3" className="font-bold text-gray-900">
          Delivery Options
        </Typography>
      </Box>

      <Box className="mb-6">
        <TextField
          fullWidth
          label="Shipping Address"
          variant="outlined"
          size="small"
          multiline
          rows={3}
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="bg-white"
          required
        />
      </Box>

      <Box className="mb-6">
        <TextField
          fullWidth
          label="Billing Address (Optional)"
          variant="outlined"
          size="small"
          multiline
          rows={3}
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          className="bg-white"
          helperText="Leave blank to use shipping address"
        />
      </Box>

      <RadioGroup
        value={deliveryOption}
        onChange={(e) => setDeliveryOption(e.target.value)}
      >
        {deliveryOptions.map((option) => (
          <Box
            key={option.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              deliveryOption === option.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setDeliveryOption(option.id)}
          >
            <FormControlLabel
              value={option.id}
              control={<Radio />}
              label={
                <Box className="flex-1">
                  <Box className="flex items-center justify-between">
                    <Typography
                      variant="bodyLg"
                      className="font-semibold text-gray-900"
                    >
                      {option.label}
                    </Typography>
                    {option.price > 0 && (
                      <Typography
                        variant="bodyLg"
                        className="font-semibold text-gray-900"
                      >
                        ${option.price.toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="bodySm" className="text-gray-600 mt-1">
                    {option.description}
                  </Typography>
                </Box>
              }
            />
          </Box>
        ))}
      </RadioGroup>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box className="space-y-4">
      <Box className="flex flex-col items-center justify-center py-8">
        <Box className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <ICONS.contact className="h-16 w-16 text-blue-600" />
        </Box>
        <Typography variant="h3" className="font-bold text-gray-900">
          Payment Method
        </Typography>
      </Box>

      <Box className="flex gap-3 mb-6">
        <Box
          className={`flex-1 p-1 border rounded-lg cursor-pointer text-center transition-all ${
            paymentMethod === 'CREDIT_CARD'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPaymentMethod('CREDIT_CARD')}
        >
          <ICONS.creditCard className="h-23 w-23 mx-auto text-gray-700" />
        </Box>
        <Box
          className={`flex-1 p-1 border rounded-lg cursor-pointer text-center transition-all ${
            paymentMethod === 'PAYPAL'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPaymentMethod('PAYPAL')}
        >
          <img src={paypalIcon} alt="PayPal" className="h-24 w-24 mx-auto" />
        </Box>
        <Box
          className={`flex-1 p-1 border rounded-lg cursor-pointer text-center transition-all ${
            paymentMethod === 'CASH_ON_DELIVERY'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
        >
          <ICONS.package className="h-23 w-23 mx-auto text-gray-700" />
        </Box>
      </Box>

      <Box className="px-2 py-3">
        <Box className="mb-4">
          <TextField
            fullWidth
            label="Name on Card"
            variant="outlined"
            size="small"
            className="bg-white"
          />
        </Box>
        <Box className="mb-4">
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            size="small"
            placeholder="1234 5678 9012 3456"
            className="bg-white"
          />
        </Box>
        <Box className="flex gap-3">
          <TextField
            fullWidth
            label="Expires"
            variant="outlined"
            size="small"
            placeholder="MM/YY"
            className="bg-white"
          />
          <TextField
            fullWidth
            label="CVV"
            variant="outlined"
            size="small"
            placeholder="123"
            className="bg-white"
          />
        </Box>
      </Box>

      <Box className="flex items-center gap-2 mt-4 px-2">
        <input
          type="checkbox"
          id="saveCard"
          className="w-4 h-4 accent-blue-600"
        />
        <Typography
          variant="bodySm"
          htmlFor="saveCard"
          className="text-gray-600 cursor-pointer"
        >
          Save my Card details
        </Typography>
      </Box>

      <Box className="mt-4">
        <TextField
          fullWidth
          label="Order Notes (Optional)"
          variant="outlined"
          size="small"
          multiline
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-white"
          helperText="Any special instructions for your order"
        />
      </Box>
    </Box>
  );

  const renderConfirmationStep = () => (
    <Box className="space-y-6">
      <Box className="flex flex-col items-center justify-center py-8">
        <Box className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <ICONS.package className="h-12 w-12 text-white" />
        </Box>
        <Typography
          variant="h3"
          className="font-bold text-gray-900 text-center"
        >
          Review Your Order
        </Typography>
        <Typography variant="bodySm" className="text-gray-500 text-center mt-2">
          Confirm the details below before submitting
        </Typography>
      </Box>

      <Box className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-200">
        <Typography variant="h5" className="font-semibold text-gray-900 mb-4">
          Order Summary
        </Typography>
        <Box className="space-y-3 mb-4">
          {items.map((item) => (
            <Box
              key={item.product.id}
              className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm"
            >
              <Box className="flex items-center gap-3">
                <Box className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.product.image.thumbnail.src}
                    alt={item.product.image.thumbnail.alt}
                    className="w-full h-full object-cover"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="bodySm"
                    className="font-medium text-gray-900 line-clamp-1"
                  >
                    {item.product.title}
                  </Typography>
                  <Typography variant="bodySm" className="text-gray-500">
                    Qty: {item.quantity}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="bodySm"
                className="font-semibold text-gray-900"
              >
                ${(
                  (typeof item.product.price === 'number'
                    ? item.product.price
                    : item.product.price.current) * item.quantity
                ).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider className="border-gray-300 my-4" />
        <Box className="space-y-2">
          <Box className="flex justify-between items-center">
            <Typography variant="bodySm" className="text-gray-600 py-2">
              Subtotal
            </Typography>
            <Typography variant="bodySm" className="font-medium text-gray-900">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box className="flex justify-between items-center">
            <Typography variant="bodySm" className="text-gray-600">
              Delivery
            </Typography>
            <Typography variant="bodySm" className="font-medium text-gray-900">
              ${getDeliveryPrice().toFixed(2)}
            </Typography>
          </Box>
          <Divider className="border-gray-300" />
          <Box className="flex justify-between items-center pt-2">
            <Typography variant="h5" className="font-bold text-gray-900">
              Total
            </Typography>
            <Typography variant="h5" className="font-bold text-blue-600">
              ${getTotalWithDelivery().toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <Box className="flex items-start gap-3">
          <Box className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <ICONS.info className="h-4 w-4 text-blue-600" />
          </Box>
          <Box>
            <Typography variant="bodySm" className="font-medium text-gray-900">
              Order Details
            </Typography>
            <Typography variant="bodySm" className="text-gray-600 mt-1">
              You will receive an email confirmation shortly with your order
              details and tracking information.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
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
          <Typography variant="h3" className="font-bold text-xl text-gray-900">
            CHECKOUT
          </Typography>
          <IconButton
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <ICONS.close className="h-6 w-6" />
          </IconButton>
        </Box>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <Box className="flex-1 overflow-y-auto p-6">
          {currentStep === 'delivery' && renderDeliveryStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          {currentStep === 'confirmation' && renderConfirmationStep()}
        </Box>

        {/* Footer */}
        <Divider className="border-gray-200" />
        <Box className="p-6 bg-gray-50 flex gap-3">
          {currentStep !== 'delivery' && (
            <Button
              variant="outlined"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-lg"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          <Button
            fullWidth={currentStep === 'delivery'}
            variant="contained"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
            onClick={() => (currentStep === 'confirmation' ? handleSubmitOrder() : handleContinue())}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : currentStep === 'confirmation' ? 'Submit Order' : 'Continue'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
