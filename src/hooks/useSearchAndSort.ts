import { SelectChangeEvent } from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function useSearchAndSort() {
   const params = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();
   const sortValue = params.get("sort");
   const queryValue = params.get("query");

   function handleSortChange(e: SelectChangeEvent) {
      const searchParams = new URLSearchParams(params);
      searchParams.set("sort", e.target.value);
      router.replace(pathname + "?" + searchParams.toString());
   }

   function handleQuery(query: string) {
      const searchParams = new URLSearchParams(params);
      if (query) searchParams.set("query", query);
      else searchParams.delete("query");
      router.replace(pathname + "?" + searchParams.toString());
   }

   return {
      handleQuery,
      handleSortChange,
      sortValue,
      queryValue,
   };
}
