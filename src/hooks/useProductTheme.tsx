import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product, products, getProductById } from '../data/products';

interface ProductTheme {
  product: Product;
  setProduct: (id: string) => void;
}

const ProductThemeContext = createContext<ProductTheme>({
  product: products[0],
  setProduct: () => {},
});

export function ProductThemeProvider({ children }: { children: ReactNode }) {
  const [product, setProductState] = useState<Product>(products[0]);

  const setProduct = (id: string) => {
    const p = getProductById(id);
    if (p) setProductState(p);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-color', product.color);
    root.style.setProperty('--theme-color-light', product.colorLight);
    root.style.setProperty('--theme-color-dark', product.colorDark);
    root.style.setProperty('--theme-color-10', `${product.color}10`);
    root.style.setProperty('--theme-color-20', `${product.color}20`);
    root.style.setProperty('--theme-color-30', `${product.color}30`);
    root.style.setProperty('--theme-color-40', `${product.color}40`);
    root.style.setProperty('--theme-glow', `${product.color}40`);
    root.style.setProperty('--theme-glow-strong', `${product.color}60`);
  }, [product]);

  return (
    <ProductThemeContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductThemeContext.Provider>
  );
}

export function useProductTheme() {
  return useContext(ProductThemeContext);
}
