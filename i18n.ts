import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { LocaleProps, locales } from "@/components/common/locales";

export default getRequestConfig(async ({ locale }) => {
   if (
      !locales.find((value: LocaleProps) => value.code === (locale as string))
   ) {
      notFound();
   }

   return {
      messages: (await import(`./messages/${locale}.json`)).default
   };
});
