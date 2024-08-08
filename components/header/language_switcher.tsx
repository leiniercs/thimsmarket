"use client";
import type { Selection } from "@nextui-org/react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
   Avatar,
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger
} from "@nextui-org/react";
import { FaLanguage } from "react-icons/fa6";
import { useRouter } from "@/components/common/navigation";
import { locales } from "@/components/common/locales";

export function LanguageSwitcher() {
   const locale = useLocale();
   const tLanguages = useTranslations("languages");
   const router = useRouter();
   const rawSearchParams: ReadonlyURLSearchParams = useSearchParams();
   let searchParams: string =
      rawSearchParams.size > 0 ? `?${rawSearchParams.toString()}` : "";

   return (
      <Dropdown>
         <DropdownTrigger>
            <Button variant="flat" isIconOnly>
               <FaLanguage className="h-6 w-6" />
            </Button>
         </DropdownTrigger>
         <DropdownMenu
            aria-label={tLanguages("language-selection")}
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={[`${locale}`]}
            onSelectionChange={(keys: Selection) => {
               router.push(`/${searchParams}`, {
                  locale: Array.from(keys)[0] as string
               });
            }}
         >
            {locales.map((value: string) => (
               <DropdownItem
                  key={value}
                  startContent={
                     <Avatar src={`/images/countries/${value}.svg`} />
                  }
               >
                  {tLanguages(value)}
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   );
}
