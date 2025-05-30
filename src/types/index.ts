export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  address?: string;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export type PaymentMethod = 'cash' | 'card' | 'transfer';

export type OrderStatus = 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id?: string;
  items: CartItem[];
  customer: Customer;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  status?: OrderStatus;
  total: number;
  createdAt?: string;
  notes?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success?: boolean; // Añadir esta propiedad
}