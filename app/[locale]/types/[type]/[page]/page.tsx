import { Products } from "@/components/home/products";

interface CustomPageProps {
   params: { locale: string; type: string; page: string };
}

export default async function LocalePage({
   params: { locale, type, page }
}: Readonly<CustomPageProps>) {
   return (
      <Products
         locale={locale}
         basePath={`/types/${type}`}
         type={type}
         page={page}
      />
   );
}
