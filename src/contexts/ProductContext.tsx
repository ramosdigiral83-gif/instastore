import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Fone de Ouvido Bluetooth",
    description: "Fone com cancelamento de ruído.",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    type: 'physical',
  },
  {
    id: "2",
    name: "Curso Mestre em Vendas",
    description: "Aprenda a vender qualquer coisa online. Acesso vitalício.",
    price: 197.00,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    type: 'digital',
    affiliateLink: "https://hotmart.com"
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Math.random().toString(36).substring(2, 9) };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
