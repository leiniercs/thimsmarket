export interface Product {
   id: string;
   slug: string;
   title: string;
   description: string;
   price: number;
   currency: string;
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
