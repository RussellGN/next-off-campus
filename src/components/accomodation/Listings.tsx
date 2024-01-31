import { Box } from "@mui/material";
import Pagination from "./Pagination";
import Listing from "./Listing";
import { getListings } from "@/lib/API_V2";
import { ListingInterface } from "@/interfaces";

export default async function Listings({
   listerListings,
}: {
   listerListings?: ListingInterface[];
}) {
   const listings = listerListings ? listerListings : await getListings();

   return (
      <Box sx={{ minHeight: "50vh" }}>
         {listings.map((listing) => (
            <Listing key={listing.id} listing={listing} />
         ))}

         <Pagination pageCount={3} />
      </Box>
   );
}
