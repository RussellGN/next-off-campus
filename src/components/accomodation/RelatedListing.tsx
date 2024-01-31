import { Box, Grid, SxProps, Typography } from "@mui/material";
import { AspectContainedImage } from "@/components/AspectRatioContainer";
import Link from "next/link";
import { ListingInterface } from "@/interfaces";
import AspectContainedNextImage from "../AspectContainedNextImage";

export default function RelatedListing({
   listing,
   width,
   sx,
}: {
   listing: ListingInterface;
   width: string | number;
   sx?: SxProps;
}) {
   return (
      <Box
         component={Link}
         href={`/accomodation/${listing.slug}`}
         sx={{
            color: "text.primary",
            border: "solid thin",
            borderColor: "divider",
            borderRadius: "8px",
            p: 1,
            mb: { xs: 1.5, sm: 2 },
            backgroundColor: "background.paper",
            width: width || "10rem",
            minWidth: "10rem",
            maxWidth: "15rem",
            transition: "all 0.1s ease-in-out",
            "&:hover": { color: "text.primary", backgroundColor: "whitesmoke" },
            ...sx,
         }}
      >
         <AspectContainedNextImage
            src={listing.images[0].image}
            alt={listing.title}
            sx={{ borderRadius: "8px" }}
            quality={100}
            aspectRatio="3 / 2"
         />

         <Box
            sx={{
               mt: 1,
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               gap: 0.5,
            }}
         >
            <Typography variant="body2" noWrap>
               {listing.title}
            </Typography>

            <Grid container spacing={0} gap={1} alignItems="center" justifyContent="space-between">
               <Grid item xs zeroMinWidth>
                  <Typography variant="caption" noWrap sx={{ display: "block" }}>
                     {listing.location}
                  </Typography>
               </Grid>

               <Grid item xs="auto">
                  <Typography
                     variant="caption"
                     sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        py: 0.2,
                        px: 0.6,
                        borderRadius: "5px",
                     }}
                  >{`$${listing.rent}`}</Typography>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
}
