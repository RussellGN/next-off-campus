import { ListingInterface } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";

export default function useListings() {
   const searchParams = useSearchParams();
   const queryString = searchParams.toString() ? "?" + searchParams.toString() : "";

   const { data, isPending, isError, error } = useQuery<
      AxiosResponse<{ listings: ListingInterface[]; page_count: number }>
   >({
      queryKey: ["listings", Object.fromEntries(searchParams.entries())],
      queryFn: async () => await axios.get("/api/listings" + queryString),
   });

   console.log(isPending ? "loading listings from /api/listings" + queryString : data?.data.listings.length);

   return {
      listings: data?.data.listings,
      pageCount: data?.data.page_count,
      isPending,
      isError,
      error,
   };
}
