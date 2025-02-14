export interface Product {
  title: string;
  description: string;
  price: number;
  image: File;
  gallery?: File[];
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  created_at: string;
}
