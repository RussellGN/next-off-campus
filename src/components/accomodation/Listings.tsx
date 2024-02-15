"use client";

import { Box, CircularProgress } from "@mui/material";
import Pagination from "./Pagination";
import Listing from "./Listing";
import { ListingInterface } from "@/interfaces";
import { getListingsAction } from "@/actions";
import useListings from "@/hooks/useListings";

export default function Listings() {
   const { listings, isPending, error, isError, pageCount } = useListings();

   if (isPending) {
      return (
         <div className="min-h-[50vh] flex items-center justify-center">
            <CircularProgress />
         </div>
      );
   }

   if (isError) {
      return (
         <p className="text-center mx-auto max-w-prose">
            There was an error <br /> <strong>{error?.message}</strong>
         </p>
      );
   }

   return (
      <div className="min-h-[50vh]">
         {listings?.map((listing) => (
            <Listing key={listing.id} listing={listing} />
         ))}

         <Pagination pageCount={pageCount || 1} />
      </div>
   );
}
