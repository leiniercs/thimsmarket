import type { ReactNode } from "react";
import type { ResolvingMetadata, Metadata } from "next";
import {
   getMessages,
   getTranslations,
   unstable_setRequestLocale
} from "next-intl/server";
import { LocaleProviders } from "@/components/providers";
import { Header } from "@/components/header";

interface CustomMetadataProps {
   params: { locale: string };
}

interface CustomLayoutProps {
   children: ReactNode;
   params: { locale: string };
}

export async function generateMetadata(
   { params: { locale } }: Readonly<CustomMetadataProps>,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const tMetadata = await getTranslations({ locale, namespace: "metadata" });
   const previousOpenGraph = (await parent).openGraph || {};

   return {
      description: tMetadata("description"),
      keywords: tMetadata("keywords"),
      openGraph: {
         ...previousOpenGraph,
         description: tMetadata("description"),
         locale: locale
      }
   };
}

export default async function LocaleLayout({
   children,
   params: { locale }
}: Readonly<CustomLayoutProps>) {
   unstable_setRequestLocale(locale);
   const messages = await getMessages({ locale });

   return (
      <LocaleProviders locale={locale} messages={messages}>
         <Header locale={locale} />
         <main>
            <section className="flex flex-col gap-10 px-6 py-6 sm:mx-auto sm:max-w-screen-xl sm:px-0">
               {children}
            </section>
         </main>
      </LocaleProviders>
   );
}
