import { Type } from "@/types/product";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import {
   Image,
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarMenu,
   NavbarMenuToggle
} from "@nextui-org/react";
import { getTypes } from "@/components/common/products";
import { ButtonCart } from "@/components/header/button_cart";
import { LanguageSwitcher } from "@/components/header/language_switcher";
import { NavigationItems } from "@/components/header/navigation_items";
import { Link } from "@/components/common/navigation";

interface CustomComponentProps {
   locale: string;
}

export async function Header({ locale }: Readonly<CustomComponentProps>) {
   unstable_setRequestLocale(locale);
   const tHeader = await getTranslations("header");
   const menuItems: Type[] = await getTypes();

   return (
      <Navbar
         classNames={{ wrapper: "px-6 sm:px-0", content: "flex gap-4" }}
         maxWidth="xl"
         isBordered
         shouldHideOnScroll
      >
         <NavbarContent justify="start">
            <NavbarMenuToggle className="sm:hidden" />
            <NavbarBrand className="pl-0">
               <Link href="/">
                  <Image
                     classNames={{ img: "!max-h-[50px]" }}
                     src={`/images/logo/logo-color-nobackground.svg`}
                     alt={tHeader("logo")}
                     radius="none"
                  />
               </Link>
            </NavbarBrand>
         </NavbarContent>
         <NavbarContent className="hidden sm:flex" justify="center">
            <NavigationItems items={menuItems} />
         </NavbarContent>
         <NavbarContent justify="end">
            <ButtonCart />
            <LanguageSwitcher />
         </NavbarContent>
         <NavbarMenu>
            <NavigationItems items={menuItems} isMenuItems={true} />
         </NavbarMenu>
      </Navbar>
   );
}
