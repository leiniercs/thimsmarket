import type { ResolvingMetadata, Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Products } from "@/components/home/products";

interface CustomMetadataProps {
   params: { locale: string };
}

interface CustomPageProps {
   params: { locale: string; page: string };
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
   params: { locale, page }
}: Readonly<CustomPageProps>) {
   return <Products locale={locale} page={page} />;
}
