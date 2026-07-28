import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import {
  MarketingLayout,
  MarketingLayoutContent,
  MarketingLayoutHeading,
  MarketingLayoutImage,
} from '../MarketingLayout';

import type { NewsletterProps } from './Newsletter.types';
import {
  newsletterFormVariants,
  newsletterInputWrapperVariants,
} from './NewsletterVariants';

export function Newsletter({
  title,
  description,
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  image,
  imageAlt = '',
  imagePosition,
  layout,
  alignment,
  variant,
  size,
  rounded,
  loading = false,
  error,
  success,
  className,
  onSubmit,
  ...props
}: NewsletterProps) {
  const [email, setEmail] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || loading) {
      return;
    }

    onSubmit?.(trimmedEmail, event);
  }

  return (
    <MarketingLayout
      variant={variant}
      size={size}
      rounded={rounded}
      imagePosition={imagePosition}
      alignment={alignment}
      className={className}
      {...props}
    >
      <MarketingLayoutContent
        className={cn(alignment === 'center' ? 'items-center text-center' : '')}
      >
        <MarketingLayoutHeading>
          <Typography variant="heading2" className="max-w-xl">
            {title}
          </Typography>

          {description && (
            <Typography variant="body" className="max-w-lg opacity-90">
              {description}
            </Typography>
          )}
        </MarketingLayoutHeading>

        <form
          onSubmit={handleSubmit}
          className={cn(
            newsletterFormVariants({
              layout,
            }),
            'max-w-xl',
          )}
        >
          <div className={newsletterInputWrapperVariants()}>
            <Input
              type="email"
              value={email}
              placeholder={placeholder}
              autoComplete="email"
              required
              disabled={loading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Subscribing...' : buttonLabel}
          </Button>
        </form>

        {error && (
          <Typography variant="caption" className="text-destructive">
            {error}
          </Typography>
        )}

        {success && (
          <Typography variant="caption" className="text-green-600">
            {success}
          </Typography>
        )}
      </MarketingLayoutContent>

      {image && <MarketingLayoutImage src={image} alt={imageAlt} />}
    </MarketingLayout>
  );
}
