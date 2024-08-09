import type { ResolvingMetadata, Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Products } from "@/components/home/products";

interface CustomMetadataProps {
   params: { locale: string };
}

interface CustomPageProps {
   params: { locale: string; type: string };
}

export async function generateMetadata(
   { params: { locale } }: Readonly<CustomMetadataProps>,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const tHome = await getTranslations({ locale, namespace: "home" });

   return {
      title: tHome("metadata.title")
   };
}

export default async function LocalePage({
   params: { locale, type }
}: Readonly<CustomPageProps>) {
   return <Products locale={locale} basePath={`/types/${type}`} type={type} />;
}
