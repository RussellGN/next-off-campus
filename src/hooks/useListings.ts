import { ListingInterface } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { usePathname, useSearchParams } from "next/navigation";

export default function useListings() {
   const pathname = usePathname();

   const searchParams = useSearchParams();
   const queryString = searchParams.toString() ? "?" + searchParams.toString() : "";

   const { data, isPending, isError, error } = useQuery<AxiosResponse<{ listings: ListingInterface[] }>>({
      queryKey: ["listings", Object.fromEntries(searchParams.entries())],
      queryFn: async () => await axios.get("/api/listings" + queryString),
   });

   console.log(isPending ? "loading listings from /api/listings" + queryString : data?.data.listings.length);

   return {
      listings: data?.data.listings,
      isPending,
      isError,
      error,
   };
}
