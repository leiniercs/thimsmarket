import type { LocaleProps } from "@/components/common/locales";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "@/components/common/locales";

export const { Link, redirect, permanentRedirect, usePathname, useRouter } =
   createSharedPathnamesNavigation({
      locales: locales.map((locale: LocaleProps) => locale.code)
   });
