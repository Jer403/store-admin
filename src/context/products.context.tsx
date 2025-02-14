import { createContext, useEffect, useState } from "react";
import { getAllProductsRequest } from "../api/products";
import { Product } from "../types";

interface ProductContextType {
  products: Product[] | null;
  loadingProducts: boolean;
}

interface ProductProviderProps {
  children: import("react").ReactElement;
}

export const ProductContext = createContext<ProductContextType>({
  products: null,
  loadingProducts: true,
});

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const getProducts = async () => {
    setLoadingProducts(true);
    try {
      console.log("Starting request products");

      const res = await getAllProductsRequest();
      console.log("Response from products: ", res);
      if (res.status == 200) {
        setProducts(res.data);
      } else {
        setProducts([] as Product[]);
      }
    } catch (error) {
      console.log("Error fetching products data: ", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadingProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
