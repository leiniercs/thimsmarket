import type { OrderProduct } from "@/types/product";

export interface Order {
   currency: string;
   discount: number;
   total: number;
   products: OrderProduct[];
}

export interface Customer {
   email: string;
   totalUSDT: number;
   walletAddress: string;
}

export interface Billing {
   firstName: string;
   lastName: string;
   address: string;
   state: string;
   country: string;
   phone: string;
   email: string;
}

export interface FullOrder {
   id: string;
   creationDate: Date;
   customer: Customer;
   billing: Billing;
   paymentGatewayResponse: any;
   currency: string;
   discount: number;
   total: number;
   products: OrderProduct[];
}
