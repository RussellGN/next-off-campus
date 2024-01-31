import { Box, Typography } from "@mui/material";
import RelatedListing from "./RelatedListing";
import { listings } from "@/data/listings";
import { ListingInterface } from "@/interfaces";

export default function RelatedListings({
   related_listings,
}: {
   related_listings: ListingInterface[];
}) {
   return (
      <>
         <Typography variant="h6" sx={{ my: 3, textAlign: "center" }}>
            Related
         </Typography>
         <Box
            sx={{
               backgroundColor: "divider",
               p: { xs: 1.5, sm: 2 },
               pb: "0 !important",
               borderRadius: "10px",
            }}
         >
            <Box sx={{ display: "flex", gap: 1.5, overflow: "auto" }}>
               {related_listings?.map((listing) => (
                  <RelatedListing key={listing.id} width="15%" listing={listing} />
               ))}
            </Box>
         </Box>
      </>
   );
}
