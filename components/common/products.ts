import type { WithId } from "mongodb";
import type { Category, Type } from "@/types/product";
import { dbClient } from "@/components/common/database";
import { ObjectId } from "mongodb";

export async function getTypes(): Promise<Type[]> {
   const results: Type[] = [];
   const dbThimsMarket = dbClient.db(process.env.DB_THIMS_MARKET_DATABASE);
   const tableThimsMarketProductTypes = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCT_TYPES
   );

   (
      await tableThimsMarketProductTypes
         .aggregate([
            {
               $lookup: {
                  from: "product_categories",
                  localField: "_id",
                  foreignField: "typeId",
                  as: "categories"
               }
            },
            {
               $project: {
                  slug: 1,
                  title: 1,
                  "categories._id": 1,
                  "categories.slug": 1,
                  "categories.type": 1,
                  "categories.title": 1
               }
            }
         ])
         .toArray()
   ).forEach((value: any) => {
      const categories: Category[] = [];

      value.categories.forEach((value: any) => {
         categories.push({
            slug: value.slug,
            type: value.type,
            title: value.title
         });
      });

      results.push({
         slug: value.slug,
         title: value.title,
         categories: categories
      });
   });

   return results;
}

export async function getProductsCount(
   type?: string,
   category?: string
): Promise<number> {
   let count: number = 0;
   const dbThimsMarket = dbClient.db(process.env.DB_THIMS_MARKET_DATABASE);
   const tableThimsMarketProducts = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCTS
   );
   const tableThimsMarketProductTypes = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCT_TYPES
   );
   const tableThimsMarketProductCategories = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCT_CATEGORIES
   );
   const filters = {};

   if (type) {
      const rowsProductType = await tableThimsMarketProductTypes.findOne(
         {
            slug: { $eq: type }
         },
         { projection: { _id: 1 } }
      );

      if (rowsProductType) {
         // @ts-ignore
         filters.type = { $eq: rowsProductType._id };
      }
   }
   if (category) {
      const rowsProductCategory =
         await tableThimsMarketProductCategories.findOne(
            {
               slug: { $eq: category }
            },
            { projection: { _id: 1 } }
         );

      if (rowsProductCategory) {
         // @ts-ignore
         filters.categories = { $eq: rowsProductCategory._id };
      }
   }

   count = await tableThimsMarketProducts.countDocuments(filters);

   return count;
}

export async function getProducts(
   type?: string,
   category?: string,
   page?: number
): Promise<Array<any>> {
   const dbThimsMarket = dbClient.db(process.env.DB_THIMS_MARKET_DATABASE);
   const tableThimsMarketProducts = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCTS
   );
   const tableThimsMarketProductTypes = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCT_TYPES
   );
   const tableThimsMarketProductCategories = dbThimsMarket.collection(
      process.env.DB_TABLE_PRODUCT_CATEGORIES
   );
   const filters = {};

   if (type) {
      const rowsProductType = await tableThimsMarketProductTypes.findOne(
         {
            slug: { $eq: type }
         },
         { projection: { _id: 1 } }
      );

      if (rowsProductType) {
         // @ts-ignore
         filters.type = { $eq: rowsProductType._id };
      }
   }
   if (category) {
      const rowsProductCategory =
         await tableThimsMarketProductCategories.findOne(
            {
               slug: { $eq: category }
            },
            { projection: { _id: 1 } }
         );

      if (rowsProductCategory) {
         // @ts-ignore
         filters.categories = { $eq: rowsProductCategory._id };
      }
   }

   const rows = await tableThimsMarketProducts
      .find(filters, { skip: Number(page || 0) * 15, limit: 15 })
      .toArray();

   return rows;
}
