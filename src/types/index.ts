export interface Product {
  title: string;
  description: string;
  price: number;
  image: File;
  gallery?: File[];
}
