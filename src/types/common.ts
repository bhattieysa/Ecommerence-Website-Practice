
export type Size = 'sm' | 'md' | 'lg';

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline'
  | 'ghost';

export type Layout = 'default' | 'icon';

export type Shape = 'pill' | 'rounded' | 'square';


export type Spacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';


export type TypographyWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';


export interface BaseComponentProps {
 
  size?: Size;
 
  variant?: ColorVariant | string;

  fullWidth?: boolean;
  
  disabled?: boolean;
}
