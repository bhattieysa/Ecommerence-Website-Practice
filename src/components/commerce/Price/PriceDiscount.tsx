import { Badge } from '@/components/badge/Badge';

interface PriceDiscountProps {
  readonly percentage: number;
}

export function PriceDiscount({ percentage }: PriceDiscountProps) {
  return (
    <Badge variant="danger" size="sm">
      -{percentage}%
    </Badge>
  );
}
