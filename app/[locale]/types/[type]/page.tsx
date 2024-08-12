import type { ResolvingMetadata, Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Products } from "@/components/home/products";

interface CustomMetadataProps {
   params: { locale: string; type: string };
}

interface CustomPageProps {
   params: { locale: string; type: string };
}

export async function generateMetadata({
   params: { locale, type }
}: Readonly<CustomMetadataProps>): Promise<Metadata> {
   const tHome = await getTranslations({ locale, namespace: "home" });
   const tHeader = await getTranslations({
      locale,
      namespace: "header.menuitems"
   });

   return {
      title: `${tHeader(type)} :: ${tHome("metadata.title")}`
   };
}

export default async function LocaleTypePage({
   params: { locale, type }
}: Readonly<CustomPageProps>) {
   return <Products locale={locale} basePath={`/types/${type}`} type={type} />;
}
