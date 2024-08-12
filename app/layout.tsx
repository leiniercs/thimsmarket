import type { Metadata, Viewport } from "next";
import type { Organization } from "schema-dts";
import { ReactNode } from "react";
import { jsonLdScriptProps } from "react-schemaorg";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RootProviders } from "@/components/providers";
import { locales } from "@/components/common/locales";
import "./globals.css";

type CustomLayoutProps = {
   children: ReactNode;
};

const urlBase: string = process.env.NEXT_PUBLIC_URL_BASE;
const appName: string = "Thims Market";
const favIcon: string = `${urlBase}/images/logo/logo-color-onlyicon-nobackground.svg`;
const ogImage: string = `${urlBase}/images/logo/logo-color-background.svg`;

export async function generateMetadata(): Promise<Metadata> {
   unstable_setRequestLocale("en");
   const tMetadata = await getTranslations({
      locale: "en",
      namespace: "metadata"
   });

   return {
      title: { default: appName, template: `%s :: ${appName}` },
      description: tMetadata("description"),
      keywords: tMetadata("keywords"),
      icons: {
         icon: favIcon,
         shortcut: favIcon,
         apple: favIcon
      },
      openGraph: {
         type: "website",
         locale: "en",
         alternateLocale: locales,
         siteName: appName,
         title: appName,
         description: tMetadata("description"),
         images: [ogImage]
      },
      alternates: {
         canonical: urlBase,
         languages: {
            en: `${urlBase}/en`,
            es: `${urlBase}/es`
         }
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

export function generateViewport(): Viewport {
   return {
      colorScheme: "dark",
      initialScale: 1.0
   };
}

export default async function RootLayout({
   children
}: Readonly<CustomLayoutProps>) {
   unstable_setRequestLocale("en");
   const tMetadata = await getTranslations({
      locale: "en",
      namespace: "metadata"
   });

   return (
      <html className="antialiased dark">
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
                  description: tMetadata("description"),
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
         <body>
            <RootProviders>{children}</RootProviders>
         </body>
      </html>
   );
}
