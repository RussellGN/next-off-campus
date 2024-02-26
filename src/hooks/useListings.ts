import { ListerInterface, ListingInterface } from "@/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function useListings(lister?: ListerInterface) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const queryClient = useQueryClient();

   let queryString: string;
   let queryKey: (string | number)[];
   if (lister?.id) {
      queryString = "?listerid=" + lister.id;
      queryKey = ["listings", lister.id];
   } else {
      queryString = searchParams.toString() ? "?" + searchParams.toString() : "";
      // queryKey = ["listings", Object.fromEntries(searchParams.entries())];
      queryKey = ["listings", searchParams.toString()];
   }

   function retry() {
      void queryClient.invalidateQueries({ queryKey: queryKey });
      router.refresh();
   }

   const { data, isPending, isError, error } = useQuery<
      AxiosResponse<{ listings: ListingInterface[]; page_count: number }>
   >({
      queryKey: queryKey,
      queryFn: async () => await axios.get("/api/listings" + queryString),
   });

   console.log(isPending ? "loading listings from /api/listings" + queryString : data?.data.listings.length);

   return {
      listings: data?.data.listings,
      pageCount: data?.data.page_count,
      isPending,
      isError,
      error,
      retry,
   };
}
