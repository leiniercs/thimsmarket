export interface Product {
   name: string;
   price: number;
   currency: string;
   stock: number;
}

export interface OrderProduct {
   slug: string;
   name: string;
   quantity: number;
   price: number;
   amount: number;
   currency: string;
}

export interface Category {
   slug: string;
   type: string;
   title: string;
}

export interface Type {
   slug: string;
   title: string;
   categories: Category[];
}
