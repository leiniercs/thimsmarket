import type { JwtPayload } from "jsonwebtoken";
import type { WithId, Document, InsertOneResult } from "mongodb";
import type { Order } from "@/types/order";
import type { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbClient } from "@/components/common/database";
import { decodeJWT } from "@/components/common/jwt";

export async function GET(request: NextRequest): Promise<NextResponse> {
   try {
      const decodedJWT: JwtPayload | null = decodeJWT(
         request.headers.get("X-Access-Key")
      );

      if (!decodedJWT) {
         return NextResponse.json({ error: true }, { status: 401 });
      }
      if (request.headers.get("Content-Type") !== "application/json") {
         return NextResponse.json({ error: true }, { status: 400 });
      }

      const dbThimsMarket = dbClient.db(
         process.env.DB_THIMS_MARKET_DATABASE as string
      );
      const tableThimsMarketProducts = dbThimsMarket.collection(
         process.env.DB_TABLE_PRODUCTS as string
      );
      const tableThimsMarketOrders = dbThimsMarket.collection(
         process.env.DB_TABLE_ORDERS as string
      );
      const tableThimsMarketOrderProducts = dbThimsMarket.collection(
         process.env.DB_TABLE_ORDER_PRODUCTS as string
      );
      const dbSDLPlatforms = dbClient.db(
         process.env.DB_SDL_PLATFORMS_DATABASE as string
      );
      const tableSDLPlatformsOrders = dbSDLPlatforms.collection(
         process.env.DB_TABLE_ORDERS as string
      );
      let dbOrderInsertOneResult: InsertOneResult;
      let dbOrderProductInsertOneResult: InsertOneResult;
      let thimsMarketOrderId: ObjectId = new ObjectId();

      dbOrderInsertOneResult = await tableThimsMarketOrders.insertOne({
         currency: decodedJWT.currency,
         discount: decodedJWT.discount,
         total: decodedJWT.total,
         paid: false,
         cancelled: false,
         creationDate: new Date()
      });

      if (dbOrderInsertOneResult.acknowledged) {
         thimsMarketOrderId = dbOrderInsertOneResult.insertedId;
         console.info(thimsMarketOrderId.toHexString());
         const dbThimsMarketProducts = await tableThimsMarketProducts
            .find({
               _id: {
                  $in: decodedJWT.products.map((product: Product) =>
                     ObjectId.createFromHexString(product.id)
                  )
               }
            })
            .toArray();

         for (let row of dbThimsMarketProducts) {
            dbOrderProductInsertOneResult =
               await tableThimsMarketOrderProducts.insertOne({
                  orderId: thimsMarketOrderId,
                  productId: row._id,
                  slug: row.slug,
                  name: row.title,
                  quantity: 1,
                  price: row.price,
                  amount: row.price,
                  currency: row.currency
               });

            if (!dbOrderProductInsertOneResult.acknowledged) {
               return NextResponse.json({ error: true }, { status: 500 });
            }
         }

         dbOrderInsertOneResult = await tableSDLPlatformsOrders.insertOne({
            storeId: ObjectId.createFromHexString(
               process.env.THIMS_MARKET_STORE_ID
            ),
            orderId: thimsMarketOrderId,
            paid: false,
            cancelled: false,
            paymentGatewayResponse: {},
            billing: {},
            creationDate: new Date()
         });

         if (dbOrderInsertOneResult.acknowledged) {
            return NextResponse.json({
               success: true,
               orderId: thimsMarketOrderId.toHexString()
            });
         } else {
            return NextResponse.json({ error: true }, { status: 500 });
         }
      } else {
         return NextResponse.json({ error: true }, { status: 500 });
      }
   } catch (e) {
      return NextResponse.json({ error: true }, { status: 500 });
   }
}
