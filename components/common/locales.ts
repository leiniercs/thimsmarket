export interface LocaleProps {
   code: string;
   rtl: boolean;
}

export const locales: LocaleProps[] = [
   { code: "ar", rtl: true },
   { code: "bn", rtl: false },
   { code: "en", rtl: false },
   { code: "es", rtl: false },
   { code: "fr", rtl: false },
   { code: "hi", rtl: false },
   { code: "pt", rtl: false },
   { code: "ru", rtl: false },
   { code: "ur", rtl: true },
   { code: "zh", rtl: false }
];
