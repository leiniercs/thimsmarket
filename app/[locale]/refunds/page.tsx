import type { ResolvingMetadata, Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Markdown from "react-markdown";
import RemarkGFM from "remark-gfm";
import { readAndTransformMarkdown } from "@/components/common/read_transform_markdown";
import "@/app/[locale]/markdown.css";

interface CustomPageProps {
   params: { locale: string };
}

interface LocalizedContent {
   [key: string]: string;
}

const localizedContent: LocalizedContent = {};
/*
export async function generateStaticParams() {
   return locales.map((value: LocaleProps) => ({
      locale: value.code
   }));
}
*/
export async function generateMetadata(
   { params: { locale } }: Readonly<CustomPageProps>,
   parent: ResolvingMetadata
): Promise<Metadata> {
   const parentOpenGraph = (await parent).openGraph || {};
   const tFooter = await getTranslations({ locale, namespace: "footer" });

   return {
      title: tFooter("legal.refunds"),
      openGraph: {
         ...parentOpenGraph,
         title: tFooter("legal.refunds")
      }
   };
}

export default async function LocalePage({
   params: { locale }
}: Readonly<CustomPageProps>) {
   if (!localizedContent[locale]) {
      localizedContent[locale] = await readAndTransformMarkdown(
         locale,
         `${process.cwd()}/components/footer/refunds/${locale}.md`
      );
   }

   return (
      <section
         id="terms"
         className="markdown relative overflow-hidden py-20 text-lg"
      >
         <div className="mx-auto flex max-w-screen-lg flex-col gap-5 px-4 sm:p-0">
            <Markdown remarkPlugins={[RemarkGFM]}>
               {localizedContent[locale]}
            </Markdown>
         </div>
      </section>
   );
}
