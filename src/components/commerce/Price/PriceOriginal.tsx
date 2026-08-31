import { Typography } from '@/components/Typography';

interface PriceOriginalProps {
  readonly value: string;
}

export function PriceOriginal({ value }: PriceOriginalProps) {
  return (
    <Typography variant="bodySm" className="line-through text-text-muted">
      {value}
    </Typography>
  );
}
