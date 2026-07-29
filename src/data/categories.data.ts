export interface CategoryData {
  id: string;
  slug: string;
  name: string;
  description: string;

  image: string;
  icon: string;

  productCount: number;

  color: string;

  href: string;
}

export const CATEGORIES: CategoryData[] = [
  {
    id: 'electronics',
    slug: 'electronics',
    name: 'Electronics',
    description: 'Phones, laptops, gadgets and more',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGbGhein0gJjcZrXfRYOxBexlSxFhZY3anYHmJcoevw&s=10',
    icon: 'laptop',
    productCount: 245,
    color: '#E8F3FF',
    href: '/shop/electronics',
  },

  {
    id: 'fashion',
    slug: 'fashion',
    name: 'Fashion',
    description: 'Latest fashion collections',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLTMP00CcKkk1FS7iSRbZikLqkA7DR0AUxqjZuDv2nDA&s=10',
    icon: 'shirt',
    productCount: 186,
    color: '#FFF3E8',
    href: '/shop/fashion',
  },

  {
    id: 'grocery',
    slug: 'grocery',
    name: 'Grocery',
    description: 'Fresh groceries',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mq4CfnSjQYrilP9onnUeZgmiE4xMW7syhIazQlPneQ&s=10',
    icon: 'shopping-cart',
    productCount: 328,
    color: '#E9FFF0',
    href: '/shop/grocery',
  },

  {
    id: 'beauty',
    slug: 'beauty',
    name: 'Beauty',
    description: 'Beauty & skincare',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv4sUg5s5wXqVFRqkD1bCortDUioe24Drt5sAdqjV-mQ&s=10',
    icon: 'sparkles',
    productCount: 154,
    color: '#FFF0F7',
    href: '/shop/beauty',
  },

  {
    id: 'home',
    slug: 'home',
    name: 'Home',
    description: 'Furniture & decor',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9Qd4SIT3SAo1IwCDa4GBYv_GYDYLEYR8GCbhz3nNfA&s=10',
    icon: 'home',
    productCount: 143,
    color: '#F8F7FF',
    href: '/shop/home',
  },

  {
    id: 'kitchen',
    slug: 'kitchen',
    name: 'Kitchen',
    description: 'Kitchen essentials',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVuW269q9F-KpSUaCVUsvlNGno-SAQYtjFxL3jckeCzg&s=10',
    icon: 'chef-hat',
    productCount: 101,
    color: '#FFF8E7',
    href: '/shop/kitchen',
  },

  {
    id: 'sports',
    slug: 'sports',
    name: 'Sports',
    description: 'Fitness & sports',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR66NYLcHXuS4TWW9YiR41rPFWEGjQnT5Yolqf2Uxc0ow&s=10',
    icon: 'dumbbell',
    productCount: 92,
    color: '#EEF8FF',
    href: '/shop/sports',
  },

  {
    id: 'gaming',
    slug: 'gaming',
    name: 'Gaming',
    description: 'Gaming accessories',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVhVdYjg_KKCXb3ZyC9WWJE7CoU7JJPvHqqicAzapPg&s=10',
    icon: 'gamepad-2',
    productCount: 84,
    color: '#F2EDFF',
    href: '/shop/gaming',
  },
];
