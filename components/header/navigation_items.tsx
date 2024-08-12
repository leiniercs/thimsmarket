"use client";
import type { ReactNode } from "react";
import type { Category, Type } from "@/types/product";
import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
   NavbarItem,
   NavbarMenuItem,
   Popover,
   PopoverContent,
   PopoverTrigger,
   Link as UILink
} from "@nextui-org/react";
import { Link, usePathname } from "@/components/common/navigation";

interface CustomComponentProps {
   items: Array<Type>;
   isMenuItems?: boolean;
}

interface NavigationItem {
   name: string;
   href: string;
   subitems: Map<string, Array<NavigationItem>>;
   active: boolean;
}

interface NavigationItempProps {
   className: string;
   item: NavigationItem;
}

function NavigationItem({
   className,
   item
}: Readonly<NavigationItempProps>): JSX.Element {
   return (
      <UILink
         as={Link}
         className={className}
         href={item.href}
         color={item.active ? "primary" : "foreground"}
         isBlock
      >
         {item.name}
      </UILink>
   );
}
export function NavigationItems({
   items,
   isMenuItems
}: Readonly<CustomComponentProps>) {
   const currentPathname = usePathname();
   const tHeader = useTranslations("header");
   const [menuHoverStates, setMenuHoverStates] = useState<Array<boolean>>([]);
   const menuItems: Array<NavigationItem> = useMemo(() => {
      const results: Array<NavigationItem> = [
         {
            name: tHeader("menuitems.home"),
            href: "/",
            subitems: new Map(),
            active: true
         }
      ];
      const hoverStates: Array<boolean> = [false];

      items.forEach((value: Type) => {
         const item: NavigationItem = {
            name: tHeader(`menuitems.${value.slug}`),
            href: `/types/${value.slug}`,
            subitems: new Map(),
            active: false
         };

         if (value.categories.length > 0) {
            value.categories.forEach((value: Category) => {
               if (item.subitems.has(value.type) === false) {
                  item.subitems.set(value.type, []);
               }

               item.subitems.get(value.type)?.push({
                  name: tHeader(`menuitems.${value.slug}`),
                  href: `/categories/${value.slug}`,
                  subitems: new Map(),
                  active: false
               });
            });
         }

         results.push(item);
         hoverStates.push(false);
      });

      setMenuHoverStates(hoverStates);

      return results;
   }, [tHeader]);

   for (let i: number = 1; i < menuItems.length; i++) {
      if (currentPathname.startsWith(menuItems[i].href)) {
         menuItems[i].active = true;
         menuItems[0].active = false;
      }
   }

   const renderSubitems = useCallback(
      (subitems: Map<string, Array<NavigationItem>>) => {
         const results: Array<ReactNode> = [];

         // @ts-ignore
         for (let key of subitems.keys()) {
            const si: Array<NavigationItem> | undefined = subitems.get(key);

            if (si) {
               results.push(
                  <div key={key} className="flex flex-col gap-4">
                     <h3 className="pl-2 font-bold">
                        {tHeader(`menuitems.${key}`)}
                     </h3>
                     <div className="flex max-h-96 flex-col flex-wrap gap-2">
                        {si.map((value: NavigationItem, index: number) => (
                           <UILink
                              key={index}
                              as={Link}
                              className="px-2 py-1"
                              href={value.href}
                              color={value.active ? "primary" : "foreground"}
                              size="sm"
                              isBlock
                           >
                              {value.name}
                           </UILink>
                        ))}
                     </div>
                  </div>
               );
            }
         }

         return results;
      },
      []
   );

   return menuItems.map((item: NavigationItem, index: number) => (
      <>
         {isMenuItems === true ? (
            <NavbarMenuItem key={index} isActive={item.active}>
               <NavigationItem className="px-2 py-1" item={item} />
            </NavbarMenuItem>
         ) : (
            <NavbarItem key={index} isActive={item.active}>
               {item.subitems.size === 0 ? (
                  <NavigationItem className="px-4 py-2" item={item} />
               ) : (
                  <Popover
                     classNames={{ content: "p-4" }}
                     isOpen={menuHoverStates[index]}
                  >
                     <PopoverTrigger
                        onMouseOverCapture={() => {
                           setMenuHoverStates((prevState: Array<boolean>) => {
                              const newState: Array<boolean> =
                                 prevState.slice();

                              newState[index] = true;

                              return newState;
                           });
                        }}
                     >
                        <div>
                           <NavigationItem className="px-4 py-2" item={item} />
                        </div>
                     </PopoverTrigger>
                     <PopoverContent
                        onMouseOverCapture={() => {
                           setMenuHoverStates((prevState: Array<boolean>) => {
                              const newState: Array<boolean> =
                                 prevState.slice();

                              newState[index] = true;

                              return newState;
                           });
                        }}
                        onMouseOutCapture={() => {
                           setMenuHoverStates((prevState: Array<boolean>) => {
                              const newState: Array<boolean> =
                                 prevState.slice();

                              newState[index] = false;

                              return newState;
                           });
                        }}
                     >
                        <div className="flex flex-wrap gap-8">
                           {renderSubitems(item.subitems)}
                        </div>
                     </PopoverContent>
                  </Popover>
               )}
            </NavbarItem>
         )}
      </>
   ));
}
