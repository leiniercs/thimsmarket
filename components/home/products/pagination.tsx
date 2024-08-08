"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "@/components/common/navigation";

interface CustomComponentProps {
   page: number;
   pages: number;
}

export function ProductsPagination({
   page,
   pages
}: Readonly<CustomComponentProps>) {
   const { push } = useRouter();

   return (
      <div className="flex w-full justify-center">
         <Pagination
            showControls
            showShadow
            color="default"
            page={page}
            total={pages}
            onChange={(page: number) => {
               if (page === 1) {
                  push("/");
               } else {
                  push(`/${page}`);
               }
            }}
         />
      </div>
   );
}
