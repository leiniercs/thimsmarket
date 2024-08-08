import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Image, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { LanguageSwitcher } from "@/components/header/language_switcher";
import { Link } from "@/components/common/navigation";

interface CustomComponentProps {
   locale: string;
}

export async function Header({ locale }: Readonly<CustomComponentProps>) {
   unstable_setRequestLocale(locale);
   const tHeader = await getTranslations("header");

   return (
      <Navbar
         classNames={{ wrapper: "px-6 sm:px-0", content: "flex gap-4" }}
         maxWidth="xl"
         isBordered
         shouldHideOnScroll
      >
         <NavbarContent justify="start">
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
         <NavbarContent justify="center"></NavbarContent>
         <NavbarContent justify="end">
            <LanguageSwitcher />
         </NavbarContent>
      </Navbar>
   );
}
