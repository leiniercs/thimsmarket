"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function RootPage() {
   const [componentMounted, setComponentMounted] = useState<boolean>(false);
   const [languageCode, setLanguageCode] = useState<string>("en");

   useEffect(() => {
      let language = window.navigator.language;

      if (language.length > 2) {
         language = language.substring(0, 2);
      }

      setLanguageCode(language);
      setComponentMounted(true);
   }, []);

   if (!componentMounted) {
      return <></>;
   }

   return redirect(`/${languageCode}/${document.location.search}`);
}
