import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Button } from '@/components/Button';
import { AuthModal } from '@/app/auth/authModels';
import { CartDrawer } from '@/components/CartDrawer/CartDrawer';
import { useCart } from '@/store/hooks';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Rating } from '@/components/commerce/Rating';

import { APP_BRAND, NAVBAR_LABELS, NAVBAR_LINKS } from './Navbar.constants';
import { Navbar } from './Navbar';

export function AppNavbar() {
  const [open, setOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Debounced search for products
  const { data: searchResults } = useProducts(
    searchQuery.length >= 2 ? { search: searchQuery, limit: 5 } : undefined
  );

  // Fetch categories for category matching
  const { data: categories } = useCategories();

  // Filter categories matching search query
  const matchingCategories = categories?.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3) || [];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchDropdown(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchDropdown(value.length >= 2);
  };

  const handleSearchBlur = () => {
    // Delay hiding dropdown to allow clicking on results
    setTimeout(() => setShowSearchDropdown(false), 200);
  };

  const handleSearchFocus = () => {
    setShowSearchDropdown(true);
  };

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate('/');
  };

  const saveRecentSearch = (query: string) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setShowSearchDropdown(false);
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/categories/${slug}`);
    setSearchQuery('');
    setShowSearchDropdown(false);
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

            <div className="absolute inset-y-0 right-3 flex items-center">
              {searchQuery && (
                <IconButton
                  icon="close"
                  aria-label="Clear search"
                  onClick={handleSearchClear}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                />
              )}
            </div>

            <Input
              className="pl-12 pr-10 bg-blue-50 border-blue-200 h-15"
              placeholder={NAVBAR_LABELS.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearch}
              onBlur={handleSearchBlur}
              onFocus={handleSearchFocus}
            />

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                {/* Recent Searches (shown when no search query) */}
                {!searchQuery && recentSearches.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <Typography variant="body" className="font-semibold text-gray-700 mb-3">
                      Recent Searches
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((query, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRecentSearchClick(query)}
                          className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          {query}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Matches */}
                {searchQuery && matchingCategories.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <Typography variant="body" className="font-semibold text-gray-700 mb-3">
                      Categories
                    </Typography>
                    {matchingCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.slug)}
                        className="p-2 hover:bg-gray-50 cursor-pointer rounded flex items-center gap-2"
                      >
                        <ICONS.search className="h-4 w-4 text-gray-500" />
                        <Typography variant="body" className="text-gray-700">
                          {category.name}
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}

                {/* Product Results */}
                {searchQuery && searchResults && searchResults.length > 0 && (
                  <div className="p-4">
                    <Typography variant="body" className="font-semibold text-gray-700 mb-3">
                      Products
                    </Typography>
                    {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <Typography variant="body" className="font-medium text-gray-900 truncate">
                          {product.title}
                        </Typography>
                        <div className="flex items-center gap-2 mt-1">
                          <Typography variant="caption" className="text-gray-600 font-semibold">
                            ${product.price}
                          </Typography>
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <Typography variant="caption" className="text-gray-400 line-through">
                              ${product.compareAtPrice}
                            </Typography>
                          )}
                        </div>
                        {product.averageRating > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Rating value={product.averageRating} size="sm" readonly />
                            <Typography variant="caption" className="text-gray-500">
                              ({product.reviewCount})
                            </Typography>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.slug);
                        }}
                        className="shrink-0"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
                )}

                {/* No Results */}
                {searchQuery && searchResults && searchResults.length === 0 && matchingCategories.length === 0 && (
                  <div className="p-6 text-center">
                    <Typography variant="body" className="text-gray-500">
                      No products or categories found for "{searchQuery}"
                    </Typography>
                  </div>
                )}
              </div>
            )}
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
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
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
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
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
        onAuthRequired={() => setIsAuthModalOpen(true)}
      />
    </>
  );
}
