import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbClient } from "@/components/common/database";
import { verifyJWT } from "@/components/common/jwt";

export async function POST(request: NextRequest): Promise<NextResponse> {
   try {
      if (!verifyJWT(request.headers.get("X-Access-Key"))) {
         return NextResponse.json({ error: true }, { status: 401 });
      }
      if (request.headers.get("Content-Type") !== "application/json") {
         return NextResponse.json({ error: true }, { status: 400 });
      }

      const { orderId } = await request.json();
      const dbThimsMarket = dbClient.db(process.env.DB_THIMS_MARKET_DATABASE);
      const tableThimsMarketOrders = dbThimsMarket.collection(
         process.env.DB_TABLE_ORDERS
      );
      const oidOrder: ObjectId = ObjectId.createFromHexString(orderId);
      const dbThimsMarketOrder = await tableThimsMarketOrders.findOne(
         { _id: oidOrder },
         { projection: { paid: 1 } }
      );

      if (dbThimsMarketOrder) {
         return NextResponse.json({
            success: true,
            paid: dbThimsMarketOrder.paid
         });
      } else {
         return NextResponse.json({ error: true }, { status: 409 });
      }
   } catch (e) {
      return NextResponse.json({ error: true }, { status: 500 });
   }
}
