import { readFile } from "fs/promises";
import { contact } from "@/components/common/contact";

export async function readAndTransformMarkdown(
   locale: string,
   path: string
): Promise<string> {
   const content: string = (await readFile(path))
      .toString()
      .replaceAll("{contact.company}", contact.company)
      .replaceAll("{contact.address}", contact.address)
      .replaceAll("{contact.pobox}", contact.pobox)
      .replaceAll("{contact.emirate}", contact.emirate)
      .replaceAll("{contact.pobox}", contact.pobox)
      .replaceAll("{contact.country}", contact.country)
      .replaceAll("{contact.email}", contact.email)
      .replaceAll("{contact.phone}", contact.phone)
      .replaceAll("{contact.tradeLicenseNumber}", contact.tradeLicenseNumber)
      .replaceAll(
         "{contact.taxRegistrationNumber}",
         contact.taxRegistrationNumber
      );

   return content;
}
