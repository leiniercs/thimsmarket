import type { NavMenuItem } from "@/types/menu";
import type { SocialMediaDetails } from "@/types/contact";
import { contact } from "@/components/common/contact";
import { getTranslations } from "next-intl/server";
import { Divider, Image, Link as UILink } from "@nextui-org/react";
import Link from "@/components/footer/link";

export async function Footer() {
   const tHeader = await getTranslations("header");
   const tFooter = await getTranslations("footer");
   const menuItemsCompany: NavMenuItem[] = [
      { name: tHeader("menuitems.home"), href: "/" }
   ];
   const menuItemsLegal: NavMenuItem[] = [
      {
         name: tFooter("legal.terms"),
         href: "https://www.sdlplatforms.com/terms"
      },
      {
         name: tFooter("legal.privacy"),
         href: "https://www.sdlplatforms.com/privacy"
      },
      {
         name: tFooter("legal.refunds"),
         href: "https://www.sdlplatforms.com/refunds"
      }
   ];

   return (
      <footer className="relative flex flex-col items-center bg-slate-900 px-10 py-28">
         <div className="flex w-full max-w-screen-lg flex-row flex-wrap gap-16">
            <div className="flex flex-col gap-1">
               <div className="flex flex-nowrap items-center gap-4">
                  <Image
                     classNames={{ wrapper: "w-10 h-10" }}
                     src="/images/logo/logo-color-onlyicon-nobackground.svg"
                     alt="Thims Market"
                  />
                  <span className="font-semibold">Thims Market</span>
               </div>
               <span className="mt-6">
                  {tFooter("owned")}{" "}
                  <a href="https://www.sdlplatforms.com">{contact.company}</a>:
               </span>
               <span>{contact.address}</span>
               <span>
                  P.O. Box {contact.pobox}, {contact.emirate}, {contact.country}
                  .
               </span>
               <div className="mt-10 flex flex-nowrap gap-4">
                  {contact.socialMedia.map(
                     (socialMedia: SocialMediaDetails, index: number) => (
                        <UILink
                           key={index}
                           href={socialMedia.url}
                           color="foreground"
                        >
                           <socialMedia.icon className="h-8 w-8" />
                        </UILink>
                     )
                  )}
               </div>
            </div>
            <Divider className="hidden lg:inline" orientation="vertical" />
            <Divider className="inline lg:hidden" orientation="horizontal" />
            <div className="flex flex-col gap-3">
               <span className="font-semibold uppercase">
                  {tFooter("company")}
               </span>
               {menuItemsCompany.map((item: NavMenuItem, index: number) => (
                  <Link key={index} item={item} />
               ))}
            </div>
            <div className="flex flex-col gap-3">
               <span className="font-semibold uppercase">
                  {tFooter("legal.title")}
               </span>
               {menuItemsLegal.map((item: NavMenuItem, index: number) => (
                  <Link key={index} item={item} />
               ))}
            </div>
         </div>
      </footer>
   );
}
