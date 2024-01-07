import {
   KeyboardArrowRight,
   MonetizationOn,
   Person,
   PlaceOutlined,
   DirectionsWalk,
} from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { listings } from "@/data/listings";
import { ListingInterface } from "@/interfaces";
import { AspectContainedImage } from "../AspectRatioContainer";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import Pagination from "./Pagination";

export default function Listings() {
   const pageCount = 3;

   return (
      <Box sx={{ minHeight: "50vh" }}>
         <Suspense
            fallback={
               <div style={{ height: "40vh" }} className="flex justify-center items-center">
                  <CircularProgress />
               </div>
            }
         >
            {listings.map((listing) => (
               <Listing key={listing.id} listing={listing} />
            ))}

            <Pagination pageCount={pageCount} />
            {/* <Pagination page={1} count={3} sx={{ width: "fit-content", mx: "auto", pt: 3 }} /> */}
         </Suspense>
      </Box>
   );
}

export async function Listing({ listing }: { listing: ListingInterface }) {
   return (
      <Paper
         sx={{
            mb: 3,
            border: "solid thin",
            borderColor: "divider",
            p: 0.8,
            borderRadius: "10px",
         }}
      >
         <Grid container>
            <Grid item xs={12} md={4}>
               <Box
                  sx={{
                     borderRadius: "10px",
                     height: "100%",
                     overflow: "hidden",
                     display: "grid",
                     gridTemplateColumns: "1fr 1fr",
                     gridTemplateRows: "1fr 1fr 1fr",
                  }}
               >
                  <div style={{ gridColumn: "span 2", gridRow: "span 2" }}>
                     <AspectContainedImage
                        src={listing.images[0]}
                        alt={listing.title}
                        style={{
                           borderRadius: 0,
                           border: "solid thin transparent",
                        }}
                     />
                  </div>

                  <div>
                     <AspectContainedImage
                        src={listing.images[1]}
                        alt={listing.title}
                        style={{
                           borderRadius: 0,
                           border: "solid thin transparent",
                        }}
                     />
                  </div>

                  <div>
                     <AspectContainedImage
                        src={listing.images[2]}
                        alt={listing.title}
                        style={{
                           borderRadius: 0,
                           border: "solid thin transparent",
                        }}
                     />
                  </div>
               </Box>
            </Grid>

            <Grid item xs={12} md>
               <Box
                  sx={{
                     p: 2,
                  }}
               >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                     <Typography noWrap fontWeight="bold" style={{ flexGrow: 1 }}>
                        {capitalize(listing.title)}
                     </Typography>
                     <Typography
                        variant="caption"
                        sx={{
                           backgroundColor: "divider",
                           p: "1px 3px",
                           borderRadius: "5px",
                        }}
                     >
                        {listing.date}
                     </Typography>
                  </Box>

                  <Typography
                     variant="body2"
                     sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                     }}
                  >
                     <PlaceOutlined fontSize="inherit" />
                     {listing.location}
                  </Typography>

                  <Typography
                     variant="body2"
                     sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                     }}
                  >
                     <MonetizationOn fontSize="inherit" />
                     {listing.rent}
                  </Typography>

                  <Typography
                     variant="body2"
                     sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                     }}
                  >
                     <DirectionsWalk fontSize="inherit" />
                     {`${listing.distance}km to ${capitalize(listing.nearestTo)}`}
                  </Typography>

                  <Box
                     sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 0.8,
                     }}
                  >
                     <span>
                        <Button
                           component={Link}
                           href={`/accomodation/${listing.slug}`}
                           endIcon={<KeyboardArrowRight />}
                        >
                           View
                        </Button>
                     </span>

                     <Typography variant="caption" color="primary">
                        <Person fontSize="inherit" /> {listing.lister.username}
                     </Typography>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Paper>
   );
}
