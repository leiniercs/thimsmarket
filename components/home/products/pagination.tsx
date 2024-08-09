"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "@/components/common/navigation";

interface CustomComponentProps {
   basePath: string;
   page: number;
   pages: number;
}

export function ProductsPagination({
   basePath,
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
                  push(basePath);
               } else {
                  push(`${basePath}/${page}`);
               }
            }}
         />
      </div>
   );
}
