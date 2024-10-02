namespace NodeJS {
   interface ProcessEnv {
      readonly NEXT_PUBLIC_URL_BASE: string;
      readonly NEXT_PUBLIC_SDLPLATFORMS_PAY_URL: string;
      readonly JWT_SECRET: string;
      readonly DB_URI: string;
      readonly DB_SDL_PLATFORMS_DATABASE: string;
      readonly DB_THIMS_MARKET_DATABASE: string;
      readonly DB_POPE_EXCHANGE_DATABASE: string;
      readonly DB_TABLE_ORDERS: string;
      readonly DB_TABLE_ORDER_PRODUCTS: string;
      readonly DB_TABLE_PRODUCTS: string;
      readonly DB_TABLE_PRODUCT_CATEGORIES: string;
      readonly DB_TABLE_PRODUCT_TYPES: string;
      readonly DB_TABLE_PRODUCT_CREATORS: string;
      readonly DB_TABLE_EXCHANGE_RATES: string;
      readonly THIMS_MARKET_STORE_ID: string;
      readonly THIMS_MARKET_TYPE_WEBSITE_THEMES_ID: string;
      readonly THIMS_MARKET_PRODUCTS_PATH: string;
   }
}
