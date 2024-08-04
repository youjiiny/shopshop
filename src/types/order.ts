import { Address } from 'types/auth';
import { CartItemType } from './product';

type Payment = {
  price: number;
  shipping: number;
  total: number;
};

export type OrderList = {
  buyer: {
    address: Address;
    name: string;
    phone: string;
    phone2?: string;
  };
  orderId: string;
  orderDate: Date;
  payment: Payment;
  products: CartItemType[];
  status: 'completed' | 'cancelled';
};
