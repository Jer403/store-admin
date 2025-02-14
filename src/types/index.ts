export interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface PaymentInterface {
  id: string;
  userId: string;
  state: string;
  price: string;
  created_at: string;
}
