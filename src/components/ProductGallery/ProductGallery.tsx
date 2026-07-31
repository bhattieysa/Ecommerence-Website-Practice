import { useEffect, useMemo, useState, useRef } from 'react';

import { ProductImage } from '@/components/commerce/ProductImage/ProductImage';
import { cn } from '@/lib/utils/cn';

import { productGalleryVariants } from './ProductGallery.variants';
import type { ProductGalleryProps } from './ProductGallery.types';

export function ProductGallery({
  productImage,
  defaultImageIndex = 0,
  thumbnailPosition,
  className,
}: ProductGalleryProps) {
  // Combine thumbnail and others into a single array
  const allImages = useMemo(() => {
    const images = [
      { id: 'thumbnail', ...productImage.thumbnail },
      ...(productImage.others?.map((img, index) => ({
        id: `other-${index}`,
        ...img,
      })) || []),
    ];
    return images;
  }, [productImage]);

  const initialImageId = allImages[defaultImageIndex]?.id ?? allImages[0]?.id;

  const [selectedImageId, setSelectedImageId] = useState(initialImageId);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  /**
   * Keep the selected image valid if the images array changes.
   */
  useEffect(() => {
    if (!allImages.length) return;

    const imageExists = allImages.some((image) => image.id === selectedImageId);

    if (!imageExists) {
      setSelectedImageId(allImages[0].id);
    }
  }, [allImages, selectedImageId]);

  const selectedImage = useMemo(() => {
    return (
      allImages.find((image) => image.id === selectedImageId) ?? allImages[0]
    );
  }, [allImages, selectedImageId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

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

      <div
        ref={imageRef}
        className="relative overflow-hidden rounded-xl border border-gray-200"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="h-full w-full object-cover transition-transform duration-200 ease-out"
          style={{
            transform: isZoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
        />
      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-4">
        {allImages.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedImageId(image.id)}
            className={cn(
              'overflow-hidden rounded-lg border transition-all',

              image.id === selectedImageId
                ? 'border-primary ring-2 ring-primary'
                : 'border-gray-200 hover:border-primary/50',
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
