import type { Order } from "@/types/order";
import { NextRequest, NextResponse } from "next/server";
import { createJWT } from "@/components/common/jwt";

export async function POST(request: NextRequest): Promise<NextResponse> {
   try {
      if (request.headers.get("Content-Type") !== "application/json") {
         return NextResponse.json({ error: true }, { status: 400 });
      }

      const { order } = await request.json();

      return NextResponse.json({
         success: true,
         key: createJWT(order as Order)
      });
   } catch (e) {
      return NextResponse.json({ error: true }, { status: 500 });
   }
}
