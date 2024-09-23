"use client";
import type { AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { NextUIProvider } from "@nextui-org/react";
import { AppStatesProvider } from "@/components/contexts/app_states";
import { useRouter } from "@/components/common/navigation";

type LocaleProps = {
   locale: string;
   messages: AbstractIntlMessages;
   children: ReactNode;
};

export function LocaleProviders({
   locale,
   messages,
   children
}: Readonly<LocaleProps>) {
   const { push } = useRouter();

   return (
      <NextIntlClientProvider
         locale={locale}
         messages={messages}
         timeZone="UTC"
      >
         <NextUIProvider locale={locale} navigate={push}>
            <AppStatesProvider>{children}</AppStatesProvider>
         </NextUIProvider>
      </NextIntlClientProvider>
   );
}
