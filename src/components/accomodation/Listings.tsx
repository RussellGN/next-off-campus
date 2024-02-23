"use client";

import { CircularProgress, Button } from "@mui/material";
import Pagination from "./Pagination";
import Listing from "./Listing";
import useListings from "@/hooks/useListings";
import { ListerInterface } from "@/interfaces";

export default function Listings({ lister }: { lister: ListerInterface }) {
   const { listings, isPending, error, isError, pageCount, retry } = useListings(lister);

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
            <br />
            <Button sx={{ mt: 2 }} onClick={retry}>
               Retry
            </Button>
         </p>
      );
   }

   return (
      <div className="min-h-[50vh]">
         {listings?.map((listing) => (
            <Listing key={listing.id} listing={listing} />
         ))}

         {listings?.length ? <Pagination pageCount={pageCount || 1} /> : <p className="text-center">No listings found</p>}
      </div>
   );
}
