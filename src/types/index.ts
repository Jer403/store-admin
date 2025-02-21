export interface Product {
  id: string;
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
  bookingDate: string;
  orderId: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  isMessageFromUser: string;
  message: string;
  created_at: string;
}

export interface ChatCard {
  id: string;
  userId: string;
  seen: boolean;
}

export interface PurchasesInterface {
  purchaseId: string;
  userId: string;
  productId: string;
  purchased_at: string;
}
