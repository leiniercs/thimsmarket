import type { ResolvingMetadata, Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { getTranslations } from "next-intl/server";
import { Products } from "@/components/home/products";

interface CustomMetadataProps {
   params: { locale: string };
}

interface CustomPageProps {
   params: { locale: string };
}

const appName: string = "Thims Market";

export async function generateMetadata(
   { params: { locale } }: Readonly<CustomMetadataProps>,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const tHome = await getTranslations({ locale, namespace: "home.metadata" });
   const resolvedOpenGraph: OpenGraph = (await parent).openGraph as OpenGraph;

   return {
      title: `${tHome("title")} :: ${appName}`,
      openGraph: { ...resolvedOpenGraph, title: tHome("title") }
   };
}

export default async function LocalePage({
   params: { locale }
}: Readonly<CustomPageProps>) {
   return <Products locale={locale} basePath="/" />;
}
