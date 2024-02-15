import { KeyboardArrowRight, MonetizationOn, PlaceOutlined, DirectionsWalk, HouseOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { ListingInterface } from "@/interfaces";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import ListerOptions from "./ListerOptions";
import ViewCountOrLister from "./ViewCountOrLister";
import AspectContainedNextImage from "../AspectContainedNextImage";

export default function Listing({ listing }: { listing: ListingInterface }) {
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
         <Grid container alignItems="center">
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
                     <AspectContainedNextImage
                        src={listing.images[0].image}
                        alt={listing.title}
                        quality={100}
                        priority
                        sx={{
                           borderRadius: 0,
                           border: "solid thin transparent",
                           backgroundColor: "divider",
                        }}
                     />
                  </div>

                  <div>
                     <AspectContainedNextImage
                        src={listing.images[1].image}
                        alt={listing.title}
                        quality={100}
                        sx={{
                           borderRadius: 0,
                           border: "solid thin transparent",
                           backgroundColor: "divider",
                        }}
                     />
                  </div>

                  <div>
                     <AspectContainedNextImage
                        src={listing.images[2].image}
                        alt={listing.title}
                        quality={100}
                        sx={{
                           borderRadius: 0,
                           border: "solid thin transparent",
                           backgroundColor: "divider",
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
                        {new Date(listing.date).toLocaleDateString()}
                        {/* {listing.date} */}
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
                     <HouseOutlined fontSize="inherit" />
                     {listing.accomodation_type}
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
                     {`${listing.distance}km to ${capitalize(listing.nearest_to)}`}
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
                        <Button component={Link} href={`/accomodation/${listing.slug}`} endIcon={<KeyboardArrowRight />}>
                           View
                        </Button>
                        <ListerOptions listingTitle={listing.title} listingSlug={listing.slug} />
                     </span>

                     <span>
                        <ViewCountOrLister views={listing.view_count} username={listing.lister.username} />
                     </span>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Paper>
   );
}
