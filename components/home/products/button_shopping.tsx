"use client";
import type { ExchangeRate } from "@/types/exchange_rate";
import type { Product } from "@/types/product";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Tooltip } from "@nextui-org/react";
import { MdAddShoppingCart } from "react-icons/md";
import { BsCartDashFill } from "react-icons/bs";
import { AppStatesContext } from "@/components/contexts/app_states";

interface CustomComponentProps {
   product: Product;
}

export function ButtonShopping({ product }: Readonly<CustomComponentProps>) {
   const { order, setOrder } = useContext(AppStatesContext);
   const tProducts = useTranslations("home.products");
   const [componentMounted, setComponentMounted] = useState<boolean>(false);
   const handleButtonClick = useCallback(() => {
      const newOrder = order;

      if (
         order.products.findIndex(
            (value: Product) => product.id === value.id
         ) !== -1
      ) {
         newOrder.products.splice(
            newOrder.products.findIndex((value: Product) => {
               return product.id === value.id;
            }),
            1
         );
      } else {
         newOrder.products.push(product);
      }

      newOrder.products = newOrder.products.sort(
         (a: Product, b: Product) => b.price - a.price
      );

      if (newOrder.products.length > 0) {
         newOrder.currency = newOrder.products[0].currency;
         newOrder.total = Number(
            Number(
               newOrder.products.reduce(
                  (previousValue: Product, currentValue: Product) => ({
                     ...currentValue,
                     price: previousValue.price + currentValue.price
                  })
               ).price
            ).toFixed(2)
         );
         newOrder.discount = Number(
            Number(Math.random() * (newOrder.total * 0.01)).toFixed(2)
         );
         newOrder.total -= newOrder.discount;
      } else {
         newOrder.currency = "USD";
         newOrder.discount = 0;
         newOrder.total = 0;
      }

      setOrder(newOrder);
   }, [order, product, setOrder]);

   useEffect(() => {
      setComponentMounted(true);
   }, []);

   return componentMounted ? (
      <Tooltip content={tProducts("add-to-cart")}>
         <Button variant="flat" isIconOnly onClick={handleButtonClick}>
            {order.products.findIndex(
               (value: Product) => product.id === value.id
            ) !== -1 ? (
               <BsCartDashFill className="h-6 w-6" />
            ) : (
               <MdAddShoppingCart className="h-6 w-6" />
            )}
         </Button>
      </Tooltip>
   ) : (
      <></>
   );
}
