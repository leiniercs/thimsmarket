import type { JwtPayload } from "jsonwebtoken";
import type { Order } from "@/types/order";
import { sign, verify } from "jsonwebtoken";
import { Product } from "@/types/product";

export function createJWT(order: Order): string {
   return sign(
      {
         currency: order.currency,
         discount: order.discount,
         total: order.total,
         products: order.products.map((product: Product) => ({
            id: product.id
         }))
      },
      process.env.JWT_SECRET,
      {
         issuer: "Thims Market",
         subject: "Temporary Session Key",
         expiresIn: "4h"
      }
   );
}

export function decodeJWT(token: string | null): JwtPayload | null {
   let decodedJWT: JwtPayload | null = null;

   try {
      if (token) {
         decodedJWT = verify(
            token,
            process.env.JWT_SECRET as string
         ) as JwtPayload;

         if (
            decodedJWT.iss === "Thims Market" &&
            decodedJWT.sub === "Temporary Session Key" &&
            (decodedJWT.exp as number) <= new Date().getTime() / 1000
         ) {
            decodedJWT = null;
         }
      }
   } catch (e) {
      decodedJWT = null;
   }

   return decodedJWT;
}

export function verifyJWT(token: string | null): boolean {
   let verified: boolean = false;

   if (decodeJWT(token)) {
      verified = true;
   }

   return verified;
}
