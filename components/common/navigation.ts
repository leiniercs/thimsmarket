import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "@/components/common/locales";

export const { Link, redirect, permanentRedirect, usePathname, useRouter } =
   createSharedPathnamesNavigation({ locales });
