import { dbClient } from "@/components/common/database";

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
               slug: { $eq: type }
            },
            { projection: { _id: 1 } }
         );

      if (rowsProductCategory) {
         // @ts-ignore
         filters.category = { $eq: rowsProductCategory._id };
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
               slug: { $eq: type }
            },
            { projection: { _id: 1 } }
         );

      if (rowsProductCategory) {
         // @ts-ignore
         filters.category = { $eq: rowsProductCategory._id };
      }
   }

   const rows = await tableThimsMarketProducts
      .find(filters, { skip: Number(page || 0) * 15, limit: 15 })
      .toArray();

   return rows;
}
