"use client";
import type { Product } from "@/types/product";
import { useCallback, useContext, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
   Badge,
   Button,
   Divider,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow
} from "@nextui-org/react";
import { FaCartShopping } from "react-icons/fa6";
import { MdDeleteForever, MdShoppingCartCheckout } from "react-icons/md";
import { AppStatesContext } from "@/components/contexts/app_states";

export function ButtonCart() {
   const { order, setOrder } = useContext(AppStatesContext);
   const locale = useLocale();
   const tShoppingCart = useTranslations("header.shopping_cart");
   const handleActionDelete = useCallback(
      (product: Product) => {
         const newOrder = order;

         newOrder.products.splice(
            newOrder.products.findIndex((value: Product) => {
               return product.id === value.id;
            }),
            1
         );

         if (newOrder.products.length > 0) {
            newOrder.total = newOrder.products.reduce(
               (previousValue: Product, currentValue: Product) => ({
                  ...currentValue,
                  price: previousValue.price + currentValue.price
               })
            ).price;
            newOrder.discount = Math.random() * (newOrder.total * 0.01);
            newOrder.total -= newOrder.discount;
         } else {
            newOrder.discount = 0;
            newOrder.total = 0;
         }

         setOrder(newOrder);
      },
      [order, setOrder]
   );

   return order.products.length > 0 ? (
      <Popover
         classNames={{ content: "flex flex-col gap-2 p-4" }}
         placement="bottom-end"
      >
         <PopoverTrigger>
            <Button variant="flat" isIconOnly>
               <Badge color="primary" content={order.products.length}>
                  <FaCartShopping className="h-6 w-6" />
               </Badge>
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <h1 className="mb-4 text-lg font-bold">{tShoppingCart("title")}</h1>
            <Table
               classNames={{ th: "uppercase" }}
               isCompact
               isStriped
               removeWrapper
            >
               <TableHeader>
                  <TableColumn>{tShoppingCart("product")}</TableColumn>
                  <TableColumn>{tShoppingCart("price")}</TableColumn>
                  <TableColumn>{tShoppingCart("actions")}</TableColumn>
               </TableHeader>
               <TableBody>
                  {order.products.map((product: Product, index: number) => (
                     <TableRow key={index}>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>
                           {Intl.NumberFormat(locale, {
                              useGrouping: true,
                              style: "currency",
                              currency: product.currency,
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                           }).format(product.price)}
                        </TableCell>
                        <TableCell className="relative flex items-center justify-center">
                           <Button
                              color="danger"
                              size="sm"
                              variant="light"
                              isIconOnly
                              onClick={() => {
                                 handleActionDelete(product);
                              }}
                           >
                              <MdDeleteForever className="h-4 w-4" />
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <Divider />
            <div className="flex w-full justify-between px-3 py-1 font-bold uppercase">
               <span>{tShoppingCart("total_before_discount")}</span>
               <span>
                  {Intl.NumberFormat(locale, {
                     useGrouping: true,
                     style: "currency",
                     currency: order.currency,
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2
                  }).format(order.total + order.discount)}
               </span>
            </div>
            <div className="flex w-full justify-between px-3 py-1 font-bold uppercase">
               <span>{tShoppingCart("discount")}</span>
               <span>
                  {Intl.NumberFormat(locale, {
                     useGrouping: true,
                     style: "currency",
                     currency: order.currency,
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2
                  }).format(order.discount)}
               </span>
            </div>
            <Divider />
            <div className="flex w-full justify-between px-3 py-1 font-bold uppercase">
               <span>{tShoppingCart("total")}</span>
               <span>
                  {Intl.NumberFormat(locale, {
                     useGrouping: true,
                     style: "currency",
                     currency: order.currency,
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2
                  }).format(order.total)}
               </span>
            </div>
            <div className="mt-4 flex w-full justify-end">
               <Button
                  className="font-bold"
                  color="primary"
                  startContent={<MdShoppingCartCheckout className="h-4 w-4" />}
                  isDisabled
               >
                  {tShoppingCart("checkout")}
               </Button>
            </div>
         </PopoverContent>
      </Popover>
   ) : (
      <></>
   );
}
