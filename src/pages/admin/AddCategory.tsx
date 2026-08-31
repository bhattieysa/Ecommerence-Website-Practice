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
  Folder,
} from 'lucide-react';

import Modal from '../../components/admin/Modal';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useUploadCategoryImage,
  useUpdateCategoryImage,
  type Category,
  type CategoryFormData,
} from '../../hooks/useCategories';


// Category interface is now imported from useCategories hook
// CategoryFormData interface is now imported from useCategories hook

interface Filters {
  search: string;
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}


const Categories = () => {
  // Replaced manual state management with TanStack Query
  const { data: categories = [], isLoading } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const uploadCategoryImageMutation = useUploadCategoryImage();
  const updateCategoryImageMutation = useUpdateCategoryImage();

  // ==================== LOCAL STATE MANAGEMENT ====================
  const [filters, setFilters] = useState<Filters>({
    search: '',
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form state
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});


  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Filter categories
  const getFilteredCategories = (): Category[] => {
    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        category.slug.toLowerCase().includes(filters.search.toLowerCase());

      return matchesSearch;
    });
  };

  // Get paginated categories
  const getPaginatedCategories = (filtered: Category[]): Category[] => {
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
      setCategoryForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCategoryForm((prev) => ({ ...prev, [name]: value }));
      // Auto-generate slug when name changes
      if (name === 'name') {
        setCategoryForm((prev) => ({ ...prev, slug: generateSlug(value) }));
      }
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

    if (images.length + files.length > 1) {
      setImageError('Maximum 1 image allowed.');
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
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
    });
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImages([]);
    setImagePreviews([]);
    setImageError('');
    setEditingCategory(null);
  };

  // ==================== CRUD OPERATIONS ====================

  const handleCreateCategory = async () => {
    try {
      setFieldErrors({});
      
      // Validate that at least one image is provided
      if (images.length === 0) {
        setImageError('At least one category image is required.');
        return;
      }
      
      const categoryData: CategoryFormData = {
        name: categoryForm.name,
        slug: categoryForm.slug,
        description: categoryForm.description,
      };

      // Use TanStack Query mutation for creating category
      const createdCategory =
        await createCategoryMutation.mutateAsync(categoryData);

      console.log('Created category:', createdCategory);

      // Upload image if provided
      if (images.length > 0 && createdCategory.id) {
        const formData = new FormData();
        formData.append('image', images[0]);
        await uploadCategoryImageMutation.mutateAsync({
          categoryId: createdCategory.id.toString(),
          formData,
        });
      }

      // TanStack Query automatically invalidates and refetches categories
      setIsFormModalOpen(false);
      resetForm();
    } catch (error: any) {
      if (error.errors) {
        setFieldErrors(error.errors);
      } else {
        console.error('Error creating category:', error);
      }
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      setFieldErrors({});
      
      // Validate that at least one image is provided (either new or existing)
      if (images.length === 0 && (!editingCategory.images || editingCategory.images.length === 0)) {
        setImageError('At least one category image is required.');
        return;
      }
      
      const categoryData: CategoryFormData = {
        name: categoryForm.name,
        slug: categoryForm.slug,
        description: categoryForm.description,
      };

      // Use TanStack Query mutation for updating category
      await updateCategoryMutation.mutateAsync({
        id: editingCategory.id.toString(),
        data: categoryData,
      });

      // Upload new image if provided
      if (images.length > 0) {
        const formData = new FormData();
        formData.append('image', images[0]);
        await updateCategoryImageMutation.mutateAsync({
          categoryId: editingCategory.id.toString(),
          formData,
        });
      }

      // TanStack Query automatically invalidates and refetches categories
      setIsFormModalOpen(false);
      resetForm();
    } catch (error: any) {
      if (error.errors) {
        setFieldErrors(error.errors);
      } else {
        console.error('Error updating category:', error);
      }
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    try {
      // Use TanStack Query mutation for deleting category
      await deleteCategoryMutation.mutateAsync(selectedCategory.id.toString());
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // fetchCategories is no longer needed - TanStack Query handles data fetching automatically
  // useEffect for initial load is no longer needed - useQuery handles it

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingCategory) {
      await handleUpdateCategory();
    } else {
      await handleCreateCategory();
    }
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    });
    setImagePreviews(category.images || []);
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (category: Category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // ==================== COMPUTED VALUES ====================

  const filteredCategories = getFilteredCategories();
  const paginatedCategories = getPaginatedCategories(filteredCategories);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endIndex = Math.min(
    startIndex + pagination.itemsPerPage - 1,
    filteredCategories.length,
  );

  // Update pagination when filtered categories change
  useEffect(() => {
    const totalPages =
      Math.ceil(filteredCategories.length / pagination.itemsPerPage) || 1;
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
    }));
  }, [filteredCategories.length, pagination.itemsPerPage]);

  // ==================== RENDER ====================

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Categories</h2>
          <p className="mt-1 text-slate-500">
            Manage all categories in your store.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Category
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
              placeholder="Search categories..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Categories Table */}
      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
            <p className="text-slate-500">Loading categories...</p>
          </div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <Folder size={48} className="mb-4 text-slate-300" />
          <h3 className="text-lg font-semibold text-slate-900">
            No Categories Found
          </h3>
          <p className="mt-1 text-slate-500">
            Start by creating your first category.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      ) : (
        <>
          {/* Categories Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Category Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Products Count
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-200">
                          {category.images && category.images[0] && (
                            <img
                              src={category.images[0]}
                              alt={category.name}
                              className="h-full w-full rounded-lg object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {category.productsCount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenViewModal(category)}
                            className="rounded-lg p-2 hover:bg-slate-100"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(category)}
                            className="rounded-lg p-2 hover:bg-blue-100 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(category)}
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
              Showing {startIndex}–{endIndex} of {filteredCategories.length}{' '}
              categories
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

      {/* Add/Edit Category Modal */}
      <Modal
        open={isFormModalOpen}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        subtitle={
          editingCategory
            ? 'Update category details.'
            : 'Create a new category.'
        }
        onClose={() => {
          setIsFormModalOpen(false);
          resetForm();
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>
            <input
              name="name"
              value={categoryForm.name}
              onChange={handleChange}
              required
              className={`w-full rounded-lg border p-3 outline-none focus:border-blue-500 ${fieldErrors.name ? 'border-red-500' : 'border-slate-200'}`}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>
            <input
              name="slug"
              value={categoryForm.slug}
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

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={categoryForm.description}
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
            <label className="mb-2 block text-sm font-medium">
              Category Image
            </label>
            <div className="space-y-4">
              {imagePreviews.length === 0 ? (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={32} className="mb-3 text-slate-400" />
                  <p className="text-sm font-medium text-slate-600">
                    Click or drag image here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Maximum 1 image, 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    {imagePreviews.length} of 1 image
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
              {editingCategory ? 'Update Category' : 'Save Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Category Modal */}
      <Modal
        open={isViewModalOpen}
        title="Category Details"
        subtitle="View category information."
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCategory(null);
        }}
      >
        {selectedCategory && (
          <div className="space-y-6">
            {/* Images */}
            <div className="grid grid-cols-2 gap-3">
              {selectedCategory.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedCategory.name} ${index + 1}`}
                  className="aspect-square rounded-lg border border-slate-200 object-cover"
                />
              ))}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {selectedCategory.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Slug</p>
                  <p className="font-medium text-slate-900">
                    {selectedCategory.slug}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Products Count</p>
                  <p className="font-medium text-slate-900">
                    {selectedCategory.productsCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Created Date</p>
                  <p className="font-medium text-slate-900">
                    {selectedCategory.createdAt}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Updated Date</p>
                  <p className="font-medium text-slate-900">
                    {selectedCategory.updatedAt}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">Description</p>
                <p className="text-slate-900">{selectedCategory.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        title="Delete Category"
        subtitle="This action cannot be undone."
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">
              {selectedCategory?.name}
            </span>
            ?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCategory(null);
              }}
              className="rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCategory}
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

export default Categories;
