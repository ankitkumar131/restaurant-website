export type Category = 
  | 'burger'
  | 'pizza'
  | 'drinks'
  | 'paneer'
  | 'roti-parantha'
  | 'chicken'
  | 'rice'
  | 'featured';

export interface Product {
  id: string;
  _id?: string; // For MongoDB compatibility
  name: string;
  description: string;
  price: number;
  image: string;
  category: string[];
  featured: boolean;
  stock?: number;
  ingredients?: string[];
  nutrition?: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  };
}

// Helper function to get id from a product (handles both id and _id cases)
export function getProductId(product: Product): string {
  return product?.id || product?._id || '';
}