import { Products } from "@/components/home/products";

interface CustomPageProps {
   params: { locale: string; page: string };
}

export default async function LocalePage({
   params: { locale, page }
}: Readonly<CustomPageProps>) {
   return <Products locale={locale} basePath="/" page={page} />;
}
