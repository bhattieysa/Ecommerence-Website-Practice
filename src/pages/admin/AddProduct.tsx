import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import {
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
  Package,
  Star,
  StarOff,
} from 'lucide-react';

import Modal from '../../components/admin/Modal';
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUploadProductImages,
  type Product,
  type ProductFormData,
  type ProductStatus,
} from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

// ==================== TYPES & INTERFACES ====================
// Product, ProductFormData, ProductStatus, and ProductCategory are now imported from useProducts hook

interface ProductForm {
  sku: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice: string;
  stock: string;
  categoryId: string;
  brand: string;
  status: ProductStatus;
  featured: boolean;
  flashSale: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  trending: boolean;
}

interface Filters {
  category: string;
  status: string;
}

const STATUSES: (ProductStatus | 'All')[] = [
  'All',
  'ACTIVE',
  'DRAFT',
  'ARCHIVED',
];

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}


const Products = () => {
  // Replaced manual state management with TanStack Query
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const uploadProductImagesMutation = useUploadProductImages();

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    status: 'All',
  });
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
  });

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [productForm, setProductForm] = useState<ProductForm>({
    sku: '',
    slug: '',
    title: '',
    description: '',
    price: '',
    compareAtPrice: '',
    stock: '',
    categoryId: '',
    brand: '',
    status: 'DRAFT',
    featured: false,
    flashSale: false,
    bestSeller: false,
    newArrival: false,
    trending: false,
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});


  // Get status badge color
  const getStatusBadgeColor = (status: ProductStatus): string => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-700';
      case 'ARCHIVED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  // Filter products
  const getFilteredProducts = (): Product[] => {
    const productsArray = Array.isArray(products) ? products : [];
    return productsArray.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        filters.category === 'All' || product.category?.name === filters.category;

      const matchesStatus =
        filters.status === 'All' || product.status === filters.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  // Get paginated products
  const getPaginatedProducts = (filtered: Product[]): Product[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProductForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProductForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateImage = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Only image files are allowed.';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'Image size must be less than 5MB.';
    }
    return null;
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageError('');
    setFieldErrors({});

    if (images.length + files.length > 8) {
      setImageError('Maximum 8 images allowed.');
      return;
    }

    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    let hasError = false;

    for (const file of files) {
      const error = validateImage(file);
      if (error) {
        setImageError(error);
        hasError = true;
        break;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    if (!hasError) {
      setImages((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setProductForm({
      sku: '',
      slug: '',
      title: '',
      description: '',
      price: '',
      compareAtPrice: '',
      stock: '',
      categoryId: '',
      brand: '',
      status: 'DRAFT',
      featured: false,
      flashSale: false,
      bestSeller: false,
      newArrival: false,
      trending: false,
    });
    setImages([]);
    setImagePreviews([]);
    setImageError('');
    setFieldErrors({});
    setEditingProduct(null);
  };

  // ==================== CRUD OPERATIONS ====================

  const handleCreateProduct = async () => {
    try {
      setFieldErrors({});
      
      // Validate that at least one image is provided
      if (images.length === 0) {
        setImageError('At least one product image is required.');
        return;
      }
      
      const productData: ProductFormData = {
        sku: productForm.sku,
        slug: productForm.slug,
        title: productForm.title,
        description: productForm.description,
        price: parseFloat(productForm.price),
        compareAtPrice: productForm.compareAtPrice ? parseFloat(productForm.compareAtPrice) : undefined,
        stock: parseInt(productForm.stock),
        categoryId: parseInt(productForm.categoryId),
        brand: productForm.brand,
        featured: productForm.featured,
        flashSale: productForm.flashSale,
        bestSeller: productForm.bestSeller,
        newArrival: productForm.newArrival,
        trending: productForm.trending,
      };

      const createdProduct =
        await createProductMutation.mutateAsync(productData);

      // Upload images if provided
      if (images.length > 0 && createdProduct.id) {
        const formData = new FormData();
        images.forEach((image) => formData.append('images', image));
        await uploadProductImagesMutation.mutateAsync({
          productId: createdProduct.id.toString(),
          formData,
        });
      }

      setIsFormModalOpen(false);
      resetForm();
    } catch (error: any) {
      if (error.errors) {
        setFieldErrors(error.errors);
      } else {
        console.error('Error creating product:', error);
      }
    }
  };

  const handleUpdateProduct = async () => {
  if (!editingProduct) return;
  try {
    setFieldErrors({});
    
    // Validate that at least one image is provided (either new or existing)
    if (images.length === 0 && (!editingProduct.images || editingProduct.images.length === 0)) {
      setImageError('At least one product image is required.');
      return;
    }
    
    const productData: ProductFormData = {
      sku: productForm.sku,
      slug: productForm.slug,
      title: productForm.title,
      description: productForm.description,
      price: parseFloat(productForm.price),
      compareAtPrice: productForm.compareAtPrice ? parseFloat(productForm.compareAtPrice) : undefined,
      stock: parseInt(productForm.stock),
      categoryId: parseInt(productForm.categoryId),
      brand: productForm.brand,
      featured: productForm.featured,
      flashSale: productForm.flashSale,
      bestSeller: productForm.bestSeller,
      newArrival: productForm.newArrival,
      trending: productForm.trending,
    };

    await updateProductMutation.mutateAsync({
      id: editingProduct.id.toString(),
      data: productData,
    });

    // Upload new images if any
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => formData.append('images', image));
      await uploadProductImagesMutation.mutateAsync({
        productId: editingProduct.id.toString(),
        formData,
      });
    }

    setIsFormModalOpen(false);
    resetForm();
  } catch (error: any) {
    if (error.errors) {
      setFieldErrors(error.errors);
    } else {
      console.error('Error updating product:', error);
    }
  }
};

const handleDeleteProduct = async () => {
  if (!selectedProduct) return;
  try {
    // Use TanStack Query mutation for deleting product
    await deleteProductMutation.mutateAsync(selectedProduct.id.toString());
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

  // fetchProducts is no longer needed - TanStack Query handles data fetching automatically
  // useEffect for initial load is no longer needed - useQuery handles it

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProduct) {
      handleUpdateProduct();
    } else {
      handleCreateProduct();
    }
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      sku: product.sku,
      slug: product.slug,
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      compareAtPrice: product.compareAtPrice?.toString() || '',
      stock: product.stock.toString(),
      categoryId: product.categoryId.toString(),
      brand: '',
      status: product.status,
      featured: product.featured,
      flashSale: product.flashSale,
      bestSeller: product.bestSeller,
      newArrival: product.newArrival,
      trending: product.trending,
    });
    setImagePreviews(product.images.map(img => img.url));
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // ==================== COMPUTED VALUES ====================

  const filteredProducts = getFilteredProducts();
  const paginatedProducts = getPaginatedProducts(filteredProducts);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endIndex = Math.min(
    startIndex + pagination.itemsPerPage - 1,
    filteredProducts.length,
  );

  // Update pagination when filtered products change
  useEffect(() => {
    const totalPages =
      Math.ceil(filteredProducts.length / pagination.itemsPerPage) || 1;
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
    }));
  }, [filteredProducts.length, pagination.itemsPerPage]);

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Products</h2>
          <p className="mt-1 text-slate-500">
            Manage all products in your store.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
            <p className="text-slate-500">Loading products...</p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <Package size={48} className="mb-4 text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900">
            No Products Found
          </h3>
          <p className="mt-1 text-slate-500">
            Start by creating your first product.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      ) : (
        <>
          {/* Products Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-slate-200">
                            {product.images[0] && (
                              <img
                                src={product.images[0].url}
                                alt={product.title}
                                className="h-full w-full rounded-lg object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {product.title}
                            </p>
                            {product.featured && (
                              <div className="flex items-center gap-1 text-xs text-amber-600">
                                <Star size={12} fill="currentColor" />
                                Featured
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {product.category?.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(
                            product.status,
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenViewModal(product)}
                            className="rounded-lg p-2 hover:bg-slate-100"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(product)}
                            className="rounded-lg p-2 hover:bg-red-100 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {startIndex}–{endIndex} of {filteredProducts.length}{' '}
              products
            </p>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.max(1, prev.currentPage - 1),
                  }))
                }
                disabled={pagination.currentPage === 1}
                className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: i + 1,
                    }))
                  }
                  className={`rounded-lg px-4 py-2 ${
                    pagination.currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    currentPage: Math.min(
                      prev.totalPages,
                      prev.currentPage + 1,
                    ),
                  }))
                }
                disabled={pagination.currentPage === pagination.totalPages}
                className="rounded-lg border border-slate-200 px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* ==================== MODALS ==================== */}

      {/* Add/Edit Product Modal */}
      <Modal
        open={isFormModalOpen}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        subtitle={
          editingProduct ? 'Update product details.' : 'Create a new product.'
        }
        onClose={() => {
          setIsFormModalOpen(false);
          resetForm();
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                SKU
              </label>
              <input
                name="sku"
                value={productForm.sku}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.sku ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.sku && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.sku[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>
              <input
                name="slug"
                value={productForm.slug}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.slug ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.slug && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.slug[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Title
              </label>
              <input
                name="title"
                value={productForm.title}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.title ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.title[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Brand</label>
              <input
                name="brand"
                value={productForm.brand}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.brand ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.brand && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.brand[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <select
                name="categoryId"
                value={productForm.categoryId}
                onChange={handleChange}
                disabled={categories.length === 0}
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.categoryId ? 'border-red-500' : 'border-slate-200'} ${categories.length === 0 ? 'bg-slate-100 cursor-not-allowed' : ''}`}
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-amber-600 text-xs mt-1">
                  No categories available. Please create a category first.
                </p>
              )}
              {fieldErrors.categoryId && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.categoryId[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Price</label>
              <input
                name="price"
                type="number"
                value={productForm.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.price ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.price[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Compare At Price</label>
              <input
                name="compareAtPrice"
                type="number"
                value={productForm.compareAtPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Optional - for sale items"
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.compareAtPrice ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.compareAtPrice && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.compareAtPrice[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Stock</label>
              <input
                name="stock"
                type="number"
                value={productForm.stock}
                onChange={handleChange}
                required
                min="0"
                className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.stock ? 'border-red-500' : 'border-slate-200'}`}
              />
              {fieldErrors.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.stock[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <select
                name="status"
                value={productForm.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 p-3 outline-none focus:border-blue-500"
              >
                {STATUSES.filter((s) => s !== 'All').map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={productForm.featured}
                onChange={handleChange}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="featured"
                className="flex items-center gap-2 text-sm font-medium"
              >
                {productForm.featured ? (
                  <Star size={18} className="fill-amber-500 text-amber-500" />
                ) : (
                  <StarOff size={18} className="text-slate-400" />
                )}
                Featured Product
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="flashSale"
                id="flashSale"
                checked={productForm.flashSale}
                onChange={handleChange}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="flashSale"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Flash Sale
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="bestSeller"
                id="bestSeller"
                checked={productForm.bestSeller}
                onChange={handleChange}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="bestSeller"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Best Seller
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="newArrival"
                id="newArrival"
                checked={productForm.newArrival}
                onChange={handleChange}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="newArrival"
                className="flex items-center gap-2 text-sm font-medium"
              >
                New Arrival
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="trending"
                id="trending"
                checked={productForm.trending}
                onChange={handleChange}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="trending"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Trending
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={productForm.description}
              onChange={handleChange}
              className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.description ? 'border-red-500' : 'border-slate-200'}`}
            />
            {fieldErrors.description && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.description[0]}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium">Images</label>
            <div className="space-y-4">
              {imagePreviews.length === 0 ? (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={32} className="mb-3 text-slate-400" />
                  <p className="text-sm font-medium text-slate-600">
                    Click or drag images here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Maximum 8 images, 5MB each
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200"
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      {imagePreviews.length < 8 && (
                        <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400 hover:bg-blue-50">
                          <Upload size={24} className="text-slate-400" />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    {imagePreviews.length} of 8 images
                  </p>
                </>
              )}
              {imageError && (
                <p className="text-sm text-red-600">{imageError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsFormModalOpen(false);
                resetForm();
              }}
              className="rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              {editingProduct ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Product Modal */}
      <Modal
        open={isViewModalOpen}
        title="Product Details"
        subtitle="View product information."
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <div className="space-y-6">
            {/* Images */}
            <div className="grid grid-cols-4 gap-3">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${selectedProduct.title} ${index + 1}`}
                  className="aspect-square rounded-lg border border-slate-200 object-cover"
                />
              ))}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {selectedProduct.title}
                  </h3>
                  {selectedProduct.featured && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-amber-600">
                      <Star size={14} fill="currentColor" />
                      Featured
                    </div>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeColor(
                    selectedProduct.status,
                  )}`}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Category</p>
                  <p className="font-medium text-slate-900">
                    {selectedProduct.category?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Price</p>
                  <p className="font-medium text-slate-900">
                    ${selectedProduct.price}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Stock</p>
                  <p className="font-medium text-slate-900">
                    {selectedProduct.stock}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Product ID</p>
                  <p className="font-medium text-slate-900">
                    #{selectedProduct.id}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">Description</p>
                <p className="text-slate-900">{selectedProduct.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        title="Delete Product"
        subtitle="This action cannot be undone."
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">
              {selectedProduct?.title}
            </span>
            ?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedProduct(null);
              }}
              className="rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteProduct}
              className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
