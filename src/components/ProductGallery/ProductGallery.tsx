import { useEffect, useMemo, useState } from 'react';

import { ProductImage } from '@/components/commerce/ProductImage/ProductImage';
import { cn } from '@/lib/utils/cn';

import { productGalleryVariants } from './ProductGallery.variants';
import type { ProductGalleryProps } from './ProductGallery.types';

export function ProductGallery({
  images,
  defaultImageIndex = 0,
  thumbnailPosition,
  className,
}: ProductGalleryProps) {
  const initialImageId = images[defaultImageIndex]?.id ?? images[0]?.id;

  const [selectedImageId, setSelectedImageId] = useState(initialImageId);

  /**
   * Keep the selected image valid if the images array changes.
   */
  useEffect(() => {
    if (!images.length) return;

    const imageExists = images.some((image) => image.id === selectedImageId);

    if (!imageExists) {
      setSelectedImageId(images[0].id);
    }
  }, [images, selectedImageId]);

  const selectedImage = useMemo(() => {
    return images.find((image) => image.id === selectedImageId) ?? images[0];
  }, [images, selectedImageId]);

  if (!selectedImage) {
    return null;
  }

  return (
    <div
      className={cn(
        productGalleryVariants({
          thumbnailPosition,
        }),
        className,
      )}
    >
      {/* Main Image */}

      <ProductImage
        src={selectedImage.src}
        alt={selectedImage.alt}
        aspectRatio="square"
        className="rounded-xl border"
      />

      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedImageId(image.id)}
            className={cn(
              'overflow-hidden rounded-lg border transition-all',

              image.id === selectedImageId
                ? 'border-primary ring-2 ring-primary'
                : 'border-border hover:border-primary/50',
            )}
          >
            <ProductImage
              src={image.src}
              alt={image.alt}
              aspectRatio="square"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
