"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination as MuiPagination } from "@mui/material";

export default function Pagination({ pageCount }: { pageCount: number }) {
   const params = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();
   const pageNumber = params.get("page");

   function handlePage(newPage: number) {
      const searchParams = new URLSearchParams(params);
      if (newPage !== 1) searchParams.set("page", newPage.toString());
      else searchParams.delete("page");
      router.replace(pathname + "?" + searchParams.toString());
   }

   return (
      <MuiPagination
         onChange={(_, newPage) => handlePage(newPage)}
         page={pageNumber ? parseInt(pageNumber) : 1}
         count={pageCount}
         sx={{ width: "fit-content", mx: "auto", pt: 3 }}
      />
   );
}
