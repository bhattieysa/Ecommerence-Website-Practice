import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

import { SlidingAuth } from '../authSlider/SlidingAuth';

import type { AuthModalProps } from './AuthModal.types';

export function AuthModal({ isOpen, onClose, className }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn('relative w-full max-w-6xl mx-4', className)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-8 w-8" />
        </button>

        <SlidingAuth />
      </div>
    </div>
  );
}
