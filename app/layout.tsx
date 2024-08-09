import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { RootProviders } from "@/components/providers";
import "./globals.css";

type CustomLayoutProps = {
   children: ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
   const tMetadata = await getTranslations({
      locale: "en",
      namespace: "metadata"
   });
   const urlBase: string = process.env.NEXT_PUBLIC_URL_BASE;
   const appName: string = "Thims Market";
   const favIcon: string = `${urlBase}/images/logo/logo-color-onlyicon-nobackground.svg`;
   const ogImage: string = `${urlBase}/images/logo/logo-color-background.svg`;

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

export default function RootLayout({ children }: Readonly<CustomLayoutProps>) {
   return (
      <html className="antialiased dark">
         <body>
            <RootProviders>{children}</RootProviders>
         </body>
      </html>
   );
}
