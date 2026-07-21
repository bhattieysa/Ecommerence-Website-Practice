
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react';


export interface PolymorphicComponentProps<E extends ElementType> {

  as?: E;
 
  children?: ReactNode;
}
  

export type PropsOf<E extends ElementType> = ComponentPropsWithoutRef<E>;


export type PolymorphicProps<
  OwnProps,
  E extends ElementType,
  DefaultElement extends ElementType = E,
> = OwnProps &
  Omit<PropsOf<E extends ElementType ? E : DefaultElement>, keyof OwnProps> &
  PolymorphicComponentProps<E extends ElementType ? E : DefaultElement>;


export type PolymorphicWithDefault<
  OwnProps,
  DefaultElement extends ElementType,
> = PolymorphicProps<OwnProps, DefaultElement, DefaultElement>;
