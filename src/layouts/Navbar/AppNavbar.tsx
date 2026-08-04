import { useState } from 'react';
import { ICONS } from '@/components/IconButton/IconButton.constants';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';

import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { AuthModal } from '@/app/auth/authModels';
import { CartDrawer } from '@/components/CartDrawer/CartDrawer';
import { useCart } from '@/contexts/CartContext';

import { APP_BRAND, NAVBAR_LABELS, NAVBAR_LINKS } from './Navbar.constants';
import { Navbar } from './Navbar';

export function AppNavbar() {
  const [open, setOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { getTotalItems } = useCart();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      className="w-80 h-full flex flex-col"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Header Section */}
      <Box className="flex items-center justify-between p-6 border-b border-gray-100">
        <Typography
          variant="h1"
          className="font-bold tracking-tight text-blue-500 text-xl"
        >
          {APP_BRAND.name}
        </Typography>
        <IconButton
          icon="close"
          aria-label="Close menu"
          onClick={toggleDrawer(false)}
          variant="ghost"
          size="md"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        />
      </Box>

      {/* Navigation Links */}
      <List className="flex-1 py-4 px-3">
        {NAVBAR_LINKS.map((link) => (
          <ListItem key={link.label} disablePadding className="mb-1">
            <ListItemButton
              component="a"
              href={link.href}
              className="rounded-xl transition-all duration-200 hover:bg-blue-50 hover:shadow-sm active:bg-blue-100"
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#eff6ff',
                },
                '&.Mui-selected': {
                  backgroundColor: '#dbeafe',
                },
              }}
            >
              {link.icon && (
                <ListItemIcon className="min-w-12">
                  <IconButton icon={link.icon} className="text-blue-500" />
                </ListItemIcon>
              )}
              <ListItemText
                primary={link.label}
                className="text-gray-700 font-medium"
                slotProps={{
                  primary: {
                    className: 'font-medium text-gray-700',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer Section */}
      <Divider className="border-gray-100" />
      <Box className="p-4 bg-gray-50">
        <List className="py-2">
          <ListItem disablePadding className="mb-1">
            <ListItemButton
              className="rounded-xl transition-all duration-200 hover:bg-gray-100"
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon className="min-w-12">
                <IconButton icon="user" className="text-gray-500" />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                className="text-gray-600"
                slotProps={{
                  primary: {
                    className: 'text-gray-600',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className="rounded-xl transition-all duration-200 hover:bg-gray-100"
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon className="min-w-12">
                <IconButton icon="cart" className="text-gray-500" />
              </ListItemIcon>
              <ListItemText
                primary="Cart"
                className="text-gray-600"
                slotProps={{
                  primary: {
                    className: 'text-gray-600',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Navbar
        left={
          <div className="flex items-center gap-4">
            <IconButton
              icon="menu"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="navigation-drawer"
              onClick={toggleDrawer(true)}
              variant="ghost"
              size="lg"
              className="bg-blue-100 text-blue-500 hover:bg-blue-200"
            />

            <Typography
              variant="h1"
              className="font-bold tracking-tight text-blue-500"
            >
              {APP_BRAND.name}
            </Typography>
          </div>
        }
        center={
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <ICONS.search className="h-7 w-7 text-blue-500" />
            </div>

            <Input
              className="pl-12 bg-blue-50 border-blue-200 h-15"
              placeholder={NAVBAR_LABELS.searchPlaceholder}
            />
          </div>
        }
        right={
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2"
              >
                <IconButton
                  icon="user"
                  aria-label="User Profile"
                  variant="ghost"
                  size="lg"
                  className="text-blue-500 hover:text-blue-600"
                />
                <Typography
                  variant="bodyLg"
                  className="font-medium text-gray-600"
                >
                  Sign In
                </Typography>
              </button>
            </div>

            <IconButton
              icon="user"
              aria-label="User Profile"
              variant="ghost"
              size="lg"
              className="md:hidden text-blue-500 hover:text-blue-600"
              onClick={() => setIsAuthModalOpen(true)}
            />

            <div className="hidden lg:flex items-center gap-2">
              <div className="relative">
                <IconButton
                  icon="cart"
                  aria-label="Shopping Cart"
                  variant="ghost"
                  size="lg"
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => setIsCartDrawerOpen(true)}
                />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <Typography
                variant="bodyLg"
                className="font-medium text-gray-600 cursor-pointer"
                onClick={() => setIsCartDrawerOpen(true)}
              >
                Cart
              </Typography>
            </div>

            <div className="relative lg:hidden">
              <IconButton
                icon="cart"
                aria-label="Shopping Cart"
                variant="ghost"
                size="lg"
                className="text-blue-500 hover:text-blue-600"
                onClick={() => setIsCartDrawerOpen(true)}
              />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>
        }
      />

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            className: 'border-r border-gray-200 shadow-xl',
            sx: {
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
            },
          },
        }}
      >
        {DrawerList}
      </Drawer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CartDrawer
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </>
  );
}
