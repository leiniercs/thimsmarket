import type { LocaleProps } from "@/components/common/locales";
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales } from "@/components/common/locales";

function getLocale(acceptLanguageHeader: string | null): string {
   const languages: string[] = new Negotiator({
      headers: { "accept-language": acceptLanguageHeader || "en;q=0.5" }
   }).languages();
   const defaultLocale = "en";

   return match(
      languages,
      locales.map((locale: LocaleProps) => locale.code),
      defaultLocale
   );
}

export function middleware(request: NextRequest): NextResponse {
   const { pathname } = request.nextUrl;
   const pathnameHasLocale = locales.some(
      (locale: LocaleProps) =>
         pathname.startsWith(`/${locale.code}/`) ||
         pathname === `/${locale.code}`
   );

   if (pathnameHasLocale) return NextResponse.next();

   const locale = getLocale(request.headers.get("accept-language"));

   request.nextUrl.pathname = `/${locale}${pathname}`;

   return NextResponse.redirect(request.nextUrl);
}

export const config = {
   matcher: ["/((?!_next|api|images))/"]
};
