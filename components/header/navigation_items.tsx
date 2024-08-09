"use client";
import { useTranslations } from "next-intl";
import { NavbarItem, NavbarMenuItem, Link as UILink } from "@nextui-org/react";
import { Link, usePathname } from "@/components/common/navigation";

interface CustomComponentProps {
   isMenuItems?: boolean;
}

interface NavigationItem {
   name: string;
   href: string;
   active: boolean;
}

export function NavigationItems({
   isMenuItems
}: Readonly<CustomComponentProps>) {
   const currentPathname = usePathname();
   const tHeader = useTranslations("header");
   const menuItems: Array<NavigationItem> = [
      { name: tHeader("menuitems.home"), href: "/", active: true },
      {
         name: tHeader("menuitems.website_themes"),
         href: "/types/website_themes",
         active: false
      }
   ];

   for (let i: number = 1; i < menuItems.length; i++) {
      if (currentPathname.startsWith(menuItems[i].href)) {
         menuItems[i].active = true;
         menuItems[0].active = false;
      }
   }

   return menuItems.map((item: NavigationItem, index: number) => (
      <>
         {isMenuItems === true ? (
            <NavbarMenuItem key={index} isActive={item.active}>
               <UILink
                  as={Link}
                  className="px-2 py-1"
                  href={item.href}
                  color={item.active ? "primary" : "foreground"}
                  isBlock
               >
                  {item.name}
               </UILink>
            </NavbarMenuItem>
         ) : (
            <NavbarItem key={index} isActive={item.active}>
               <UILink
                  as={Link}
                  className="px-4 py-2"
                  href={item.href}
                  color={item.active ? "primary" : "foreground"}
                  isBlock
               >
                  {item.name}
               </UILink>
            </NavbarItem>
         )}
      </>
   ));
}
