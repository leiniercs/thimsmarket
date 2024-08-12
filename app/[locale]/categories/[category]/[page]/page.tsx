import { Products } from "@/components/home/products";

interface CustomPageProps {
   params: { locale: string; category: string; page: string };
}

export default async function LocalePage({
   params: { locale, category, page }
}: Readonly<CustomPageProps>) {
   return (
      <Products
         locale={locale}
         basePath={`/categories/${category}`}
         category={category}
         page={page}
      />
   );
}
