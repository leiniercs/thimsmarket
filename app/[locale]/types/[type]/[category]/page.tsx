import type { ResolvingMetadata, Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Products } from "@/components/home/products";

interface CustomMetadataProps {
   params: { locale: string };
}

interface CustomPageProps {
   params: { locale: string; type: string; category: string };
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
   params: { locale, type, category }
}: Readonly<CustomPageProps>) {
   return <Products locale={locale} type={type} category={category} />;
}
