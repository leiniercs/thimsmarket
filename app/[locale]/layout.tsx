import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { Organization } from "schema-dts";
import type { LocaleProps } from "@/components/common/locales";
import {
   getMessages,
   getTranslations,
   unstable_setRequestLocale
} from "next-intl/server";
import { jsonLdScriptProps } from "react-schemaorg";
import { LocaleProviders } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { locales } from "@/components/common/locales";
import "./globals.css";

interface CustomMetadataProps {
   params: { locale: string };
}

interface CustomLayoutProps {
   children: ReactNode;
   params: { locale: string };
}

interface AlternateLanguageURL {
   [key: string]: string;
}

const urlBase: string = process.env.NEXT_PUBLIC_URL_BASE;
const appName: string = "Thims Market";
const favIcon: string = `${urlBase}/images/logo/logo-color-onlyicon-nobackground.svg`;
const ogImage: string = `${urlBase}/images/logo/logo-color-background.svg`;

export async function generateMetadata({
   params: { locale }
}: Readonly<CustomMetadataProps>): Promise<Metadata> {
   const tMetadata = await getTranslations({
      locale,
      namespace: "metadata"
   });
   const tHome = await getTranslations({
      locale,
      namespace: "home.metadata"
   });
   const alternateLanguageURLs: AlternateLanguageURL = {};

   for (let locale of locales) {
      alternateLanguageURLs[locale.code] = `${urlBase}/${locale.code}`;
   }

   return {
      title: {
         default: appName,
         template: `%s :: ${appName}`
      },
      description: tMetadata("description"),
      keywords: tMetadata("keywords"),
      icons: {
         icon: favIcon,
         shortcut: favIcon,
         apple: favIcon
      },
      openGraph: {
         type: "website",
         locale: locale,
         alternateLocale: locales.map((locale: LocaleProps) => locale.code),
         siteName: appName,
         title: tHome("title"),
         description: tMetadata("description"),
         images: [ogImage]
      },
      alternates: {
         canonical: urlBase,
         languages: alternateLanguageURLs
      },
      category: "technology",
      verification: { google: "eySahAVdUor4wEfyPheFKfw9TlWd9QcB9p6C-M5qzJQ" },
      robots: {
         index: true,
         follow: true,
         googleBot: {
            index: true,
            follow: true
         }
      }
   };
}

export default async function LocaleLayout({
   children,
   params: { locale }
}: Readonly<CustomLayoutProps>): Promise<JSX.Element> {
   unstable_setRequestLocale(locale);
   const messages = await getMessages({ locale });

   return (
      <html
         className="dark"
         lang={locale}
         dir={
            locales.find((value: LocaleProps) => value.code === locale)?.rtl ===
            true
               ? "rtl"
               : "ltr"
         }
      >
         <head>
            <script
               id="organization_jd_json"
               key="organization_jd_json"
               {...jsonLdScriptProps<Organization>({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  image: ogImage,
                  url: urlBase,
                  logo: favIcon,
                  name: appName,
                  // @ts-ignore
                  description: messages.metadata.description,
                  email: "contact@sdlplatforms.com",
                  telephone: "+971 (4) 288-5285",
                  address: {
                     "@type": "PostalAddress",
                     streetAddress:
                        "Building A1, Dubai Digital Park, Dubai Silicon Oasis. P.O. Box 342001",
                     addressLocality: "Dubai",
                     addressRegion: "Dubai",
                     postalCode: "00000",
                     addressCountry: "AE"
                  },
                  // @ts-ignore
                  hasMerchantReturnPolicy: {
                     merchantReturnLink: "https://www.sdlplatforms.com/refund",
                     itemCondition: "https://schema.org/NewCondition",
                     refundType: "https://schema.org/FullRefund",
                     returnFees: "https://schema.org/FreeReturn"
                  },
                  foundingDate: "2024-04-19T00:00:00",
                  taxID: "104457494300001"
               })}
            />
         </head>
         <body className="antialiased">
            <LocaleProviders locale={locale} messages={messages}>
               <Header locale={locale} />
               <main>
                  <section className="flex flex-col gap-10 px-6 py-6 sm:mx-auto sm:max-w-screen-xl sm:px-0">
                     {children}
                  </section>
               </main>
               <Footer />
            </LocaleProviders>
         </body>
      </html>
   );
}
