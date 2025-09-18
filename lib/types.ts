export interface Product {
  _id: string | number;
  name: string;
  description?: string;
  price: number | string;
  category: string;
  brand?: string;
  image: string;
  rating: number;
  originalPrice?: number | string | null;
  isSale: boolean;
  createdAt?: string;
  updatedAt?: string;
  url: string;
}