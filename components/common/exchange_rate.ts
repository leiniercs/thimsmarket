import type { ExchangeRate } from "@/types/exchange_rate";
import { dbClient } from "@/components/common/database";

export async function getExchangeRates(currency: string) {
   const exchangeRateData: ExchangeRate = { currency: currency, rate: 0 };

   const db = dbClient.db(process.env.DB_POPE_EXCHANGE_DATABASE);
   const tableExchangeRates = db.collection<ExchangeRate>(
      process.env.DB_TABLE_EXCHANGE_RATES
   );
   const dbExchangeRate = await tableExchangeRates.findOne({
      currency: currency
   });

   if (dbExchangeRate) {
      exchangeRateData.rate = dbExchangeRate.rate;
   }

   return exchangeRateData;
}
