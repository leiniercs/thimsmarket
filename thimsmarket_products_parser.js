require("dotenv").config();
const { existsSync, createWriteStream } = require("node:fs");
const { spawnSync } = require("node:child_process");
const thimsMarketProductListRaw = require("./thims_market_products.json");
const thimsMarketProductList = [];
const oidTypes = new Map();
const oidCategories = new Map();
//   const prices = [];
const { MongoClient, ObjectId } = require("mongodb");
const dbClient = new MongoClient(env.DB_URI, {
   appName: "Thims Market - Products Parser"
});
const dbThimsMarket = dbClient.db(env.DB_THIMS_MARKET_DATABASE);
const tableThimsMarketProductTypes = dbThimsMarket.collection(
   env.DB_TABLE_PRODUCT_TYPES
);
const tableThimsMarketProductCategories = dbThimsMarket.collection(
   env.DB_TABLE_PRODUCT_CATEGORIES
);
const tableThimsMarketCreators = dbThimsMarket.collection(
   env.DB_TABLE_PRODUCT_CREATORS
);
const tableThimsMarketProducts = dbThimsMarket.collection(
   env.DB_TABLE_PRODUCTS
);

oidTypes.set(
   "website_themes",
   ObjectId.createFromHexString("66b4da2edb5f5481e64c8127")
);

async function downloadProduct(product) {
   if (
      !existsSync(
         `${process.env.THIMS_MARKET_PRODUCTS_PATH}/${product.slug}.zip`
      )
   ) {
      const fetchThumbnail = await fetch(
         `https://statichunt-images.netlify.app/themes/thumbnails/${product.slug}.webp`,
         { method: "GET" }
      );
      const streamThumbnail = createWriteStream(
         `${process.cwd}/public/images/products/${product.slug}.webp`,
         { autoClose: true }
      );
      streamThumbnail.write(await fetchThumbnail.arrayBuffer());

      const spawnResult = spawnSync(
         "git",
         [
            "clone",
            "--recurse-submodules",
            product.frontmatter.github,
            product.slug
         ],
         {
            cwd: process.env.THIMS_MARKET_PRODUCTS_PATH,
            timeout: 20000
         }
      );

      if (spawnResult.error) {
         return false;
      }

      spawnSync(
         "rm",
         [
            "-fr",
            ".next",
            ".astro",
            ".git*",
            ".vscode",
            "README*",
            "LICENSE*",
            "CHANGELOG*",
            "FEATURES*",
            "CODE_OF_CONDUCT*",
            "pnpm-lock.yaml",
            "package-lock.json",
            "yarn-error.log",
            "yarn.lock",
            ".husky",
            "bun."
         ],
         {
            cwd: `${process.env.THIMS_MARKET_PRODUCTS_PATH}/${product.slug}`,
            shell: true
         }
      );
      spawnSync("zip", ["-r", `${product.slug}.zip`, product.slug], {
         cwd: process.env.THIMS_MARKET_PRODUCTS_PATH
      });
      spawnSync("rm", ["-fr", product.slug], {
         cwd: process.env.THIMS_MARKET_PRODUCTS_PATH
      });

      return true;
   }
}

async function processProductCategories(categories, type) {
   const categoriesOID = [];

   if (
      categories !== null &&
      categories !== undefined &&
      categories.length > 0
   ) {
      for (let category of categories) {
         const categorySlug = category.toLowerCase();

         if (oidCategories.has(categorySlug)) {
            categoriesOID.push(oidCategories.get(categorySlug));
         } else {
            const dbCategory = await tableThimsMarketProductCategories.findOne({
               slug: categorySlug
            });

            if (dbCategory) {
               oidCategories.set(categorySlug, dbCategory._id);
               categoriesOID.push(dbCategory._id);
            } else {
               const insertedCategory =
                  await tableThimsMarketProductCategories.insertOne({
                     slug: categorySlug,
                     type: type,
                     title: category
                  });

               oidCategories.set(categorySlug, insertedCategory.insertedId);
               categoriesOID.push(insertedCategory.insertedId);
            }
         }
      }
   }

   return categoriesOID;
}

async function processProducts() {
   const creators = (
      await tableThimsMarketCreators
         .find({}, { projection: { _id: 1 } })
         .toArray()
   ).map((value) => value._id);
   let lastUsedCreator = 0;
   let index = 1;

   for (let product of thimsMarketProductListRaw) {
      if (product.frontmatter.github && product.frontmatter.category) {
         if (
            (await tableThimsMarketProducts.countDocuments({
               slug: product.slug
            })) === 0
         ) {
            thimsMarketProductList.push(product);
         }
      }
   }
   /*
   for (
      let i = 0;
      i < Number(thimsMarketProductList.length * 0.05).toFixed(0);
      i++
   ) {
      prices.push(5);
   }
   for (
      let i = 0;
      i < Number(thimsMarketProductList.length * 0.05).toFixed(0);
      i++
   ) {
      prices.push(10);
   }
   for (
      let i = 0;
      i < Number(thimsMarketProductList.length * 0.1).toFixed(0);
      i++
   ) {
      prices.push(20);
   }
   for (
      let i = 0;
      i < Number(thimsMarketProductList.length * 0.2).toFixed(0);
      i++
   ) {
      prices.push(50);
   }
   for (
      let i = 0;
      i < Number(thimsMarketProductList.length * 0.6).toFixed(0);
      i++
   ) {
      prices.push(100);
   }
*/
   console.info(
      `Total website themes to process: ${thimsMarketProductList.length}`
   );

   for (let product of thimsMarketProductList) {
      if (product.frontmatter.github && product.frontmatter.category) {
         const categoriesOID = [];

         categoriesOID.push(
            await processProductCategories(
               product.frontmatter.category,
               "category"
            )
         );
         categoriesOID.push(
            await processProductCategories(product.frontmatter.ssg, "ssg")
         );
         categoriesOID.push(
            await processProductCategories(product.frontmatter.css, "css")
         );
         categoriesOID.push(
            await processProductCategories(product.frontmatter.cms, "cms")
         );

         await downloadProduct(product);

         await tableThimsMarketProducts.insertOne({
            slug: product.slug,
            title: product.frontmatter.title,
            description: product.frontmatter.description,
            content: product.content,
            type: oidTypes.get("website_themes"),
            categories: categoriesOID,
            creator: creators[Math.floor(Math.random() * creators.length)],
            price: 0,
            currency: "USD"
         });

         if (lastUsedCreator >= creators.length) {
            lastUsedCreator = 0;
         }

         console.info(
            `[${index++}/${thimsMarketProductList.length}] '${product.frontmatter.title}' processed.`
         );

         spawnSync("sleep", ["1"]);
      }
   }
}

processProducts().catch(console.error);