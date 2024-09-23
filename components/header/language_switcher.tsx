"use client";
import type { Selection } from "@nextui-org/react";
import type { LocaleProps } from "@/components/common/locales";
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
            {locales.map((value: LocaleProps) => (
               <DropdownItem
                  key={value.code}
                  className="capitalize"
                  dir={value.rtl ? "rtl" : ""}
                  startContent={
                     <Avatar src={`/images/countries/${value.code}.svg`} />
                  }
                  title={new Intl.DisplayNames(value.code, {
                     type: "language"
                  }).of(value.code)}
               />
            ))}
         </DropdownMenu>
      </Dropdown>
   );
}
