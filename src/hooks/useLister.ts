import { ListerInterface, ListingInterface } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export default function useLister() {
   const { data, isPending, isError, error } = useQuery<
      AxiosResponse<{ lister: ListerInterface; lister_listings_length: number }>
   >({
      queryKey: ["lister"],
      queryFn: async () => await axios.get("/api/auth"),
   });

   console.log(isPending ? "loading lister..." : (data?.data.lister?.username ?? "nobody") + " is logged in");

   return {
      lister: data?.data.lister,
      lister_listings_length: data?.data.lister_listings_length,
      isPending,
      isError,
      error,
   };
}
