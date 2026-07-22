import { useState } from 'react';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';
import { Typography } from '@/components/Typography';

import { APP_BRAND, NAVBAR_LABELS, NAVBAR_LINKS } from './Navbar.constants';
import { Navbar } from './Navbar';

export function AppNavbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <div className="w-80" role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {NAVBAR_LINKS.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton component="a" href={link.href}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Navbar
        left={
          <div className="flex items-center gap-4">
            <IconButton
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="navigation-drawer"
              onClick={toggleDrawer(true)}
              variant="ghost"
              size="lg"
              className="bg-blue-100 text-blue-500 hover:bg-blue-200"
            >
              <Menu className="h-7 w-7" />
            </IconButton>

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
              <Search className="h-7 w-7 text-blue-500" />
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
              <IconButton
                aria-label="User Profile"
                variant="ghost"
                size="lg"
                className="text-blue-500 hover:text-blue-600"
              >
                <User className="h-7 w-7" />
              </IconButton>
              <Typography
                variant="bodyLg"
                className="font-medium text-gray-600"
              >
                Sign In
              </Typography>
            </div>

            <IconButton
              aria-label="User Profile"
              variant="ghost"
              size="lg"
              className="md:hidden text-blue-500 hover:text-blue-600"
            >
              <User className="h-7 w-7" />
            </IconButton>

            <div className="hidden lg:flex items-center gap-2">
              <IconButton
                aria-label="Shopping Cart"
                variant="ghost"
                size="lg"
                className="text-blue-500 hover:text-blue-600"
              >
                <ShoppingCart className="h-7 w-7" />
              </IconButton>
              <Typography
                variant="bodyLg"
                className="font-medium text-gray-600"
              >
                Cart
              </Typography>
            </div>

            <IconButton
              aria-label="Shopping Cart"
              variant="ghost"
              size="lg"
              className="lg:hidden text-blue-500 hover:text-blue-600"
            >
              <ShoppingCart className="h-7 w-7" />
            </IconButton>
          </div>
        }
      />

      <div className="md:hidden px-4 py-4 border-b bg-background">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-6 w-6 text-blue-500" />
          </div>

          <Input
            className="pl-10 bg-blue-50 border-blue-200 h-12"
            placeholder={NAVBAR_LABELS.searchPlaceholder}
          />
        </div>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
