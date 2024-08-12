import type { Product } from "schema-dts";
import Head from "next/head";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   Image,
   Tooltip
} from "@nextui-org/react";
import { jsonLdScriptProps } from "react-schemaorg";
import { FaCartPlus } from "react-icons/fa6";
import { getProducts, getProductsCount } from "@/components/common/products";
import { ProductsPagination } from "@/components/home/products/pagination";

interface CustomComponentProps {
   locale: string;
   basePath: string;
   type?: string;
   category?: string;
   page?: string;
}

interface CustomCardProps {
   locale: string;
   product: any;
   addToCart: string;
}

function ProductCard({
   locale,
   product,
   addToCart
}: Readonly<CustomCardProps>) {
   return (
      <Card
         classNames={{
            base: "w-full max-w-sm overflow-hidden",
            header: "p-0 border-b-1 border-b-content2",
            body: "flex flex-col gap-4 max-h-56 overflow-hidden",
            footer: "flex justify-end"
         }}
      >
         <CardHeader>
            <Image
               classNames={{
                  wrapper: "min-h-[255px] min-w-full",
                  img: "w-full h-full"
               }}
               src={`/images/products/${product.slug}.webp`}
               alt={product.slug}
               radius="none"
            />
         </CardHeader>
         <CardBody>
            <div className="flex flex-nowrap justify-between">
               <span className="truncate text-lg font-bold">
                  {product.title}
               </span>
               <span className="font-bold text-success-600">
                  {Intl.NumberFormat(locale, {
                     style: "currency",
                     currency: product.currency,
                     useGrouping: true,
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2
                  }).format(product.price)}
               </span>
            </div>
            <p>{product.description}</p>
         </CardBody>
         <CardFooter>
            <Tooltip content={addToCart}>
               <Button variant="flat" isIconOnly>
                  <FaCartPlus className="h-6 w-6" />
               </Button>
            </Tooltip>
         </CardFooter>
      </Card>
   );
}

export async function Products({
   locale,
   basePath,
   type,
   category,
   page
}: Readonly<CustomComponentProps>) {
   unstable_setRequestLocale(locale);
   const tProducts = await getTranslations("home.products");
   const totalProducts: number = Math.floor(
      (await getProductsCount(type, category)) / 15
   );
   const products: Array<any> = await getProducts(
      type,
      category,
      Number(page || "0")
   );

   return (
      <>
         <Head>
            <script
               id="products_jd_json"
               key="products_jd_json"
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(
                     products.map((product: any) => ({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        name: product.title,
                        description: product.description,
                        image: `${process.env.NEXT_PUBLIC_URL_BASE}/images/products/${product.slug}.webp`,
                        offers: {
                           "@type": "Offer",
                           price: product.price,
                           priceCurrency: product.currency,
                           availability: "https://schema.org/InStock"
                        }
                     })),
                     null,
                     ""
                  )
               }}
            />
         </Head>
         <div className="flex flex-wrap justify-between gap-10">
            <ProductsPagination
               basePath={basePath}
               page={Number(page || "0")}
               pages={totalProducts}
            />
            {products.map((product: any, index: number) => (
               <ProductCard
                  key={index}
                  locale={locale}
                  product={product}
                  addToCart={tProducts("add-to-cart")}
               />
            ))}
            <ProductsPagination
               basePath={basePath}
               page={Number(page || "0")}
               pages={totalProducts}
            />
         </div>
      </>
   );
}
