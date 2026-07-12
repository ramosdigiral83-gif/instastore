export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  affiliateLink?: string;
  type?: 'physical' | 'digital';
}

export interface CartItem extends Product {
  quantity: number;
}
