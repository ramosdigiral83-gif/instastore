export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'physical' | 'digital';
  affiliateLink?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
