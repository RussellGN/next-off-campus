import { SimpleListingInterface } from "@/interfaces";
import { Box, Paper, Typography } from "@mui/material";
import AspectContainedNextImage from "../AspectContainedNextImage";
import { PlaceOutlined } from "@mui/icons-material";
import { capitalize } from "@/lib/utils";

export default function HeroListingCard({
   listing,
   index,
}: {
   listing: SimpleListingInterface;
   index: number;
}) {
   return (
      <Paper
         elevation={2}
         sx={{
            width: "33%",
            p: 0.2,
            borderRadius: "15px",
            backgroundColor: "white",
            transform: index === 1 ? "scale(1.2)" : "",
         }}
      >
         <AspectContainedNextImage
            priority
            src={listing.coverImage}
            quality={100}
            alt={listing.title}
            aspectRatio="3 / 2"
            sx={{ borderRadius: "15px 15px 5px 5px" }}
         />

         <Box sx={{ p: 1, pb: 0, textAlign: "center" }}>
            <Typography fontWeight="bold" noWrap variant="caption" component="div">
               {capitalize(listing.title)}
            </Typography>

            <Typography noWrap variant="caption" component="div" sx={{ my: 0.5 }}>
               <PlaceOutlined fontSize="inherit" sx={{ mt: -0.3, mr: 0.3 }} />
               {listing.location}
            </Typography>

            <Typography
               noWrap
               component="div"
               sx={{
                  my: 1,
                  backgroundColor: "divider",
                  fontSize: "60% !important",
                  width: "fit-content",
                  mx: "auto",
                  p: "1px 5px",
                  borderRadius: "6px",
               }}
            >
               $ {listing.rent}
            </Typography>
         </Box>
      </Paper>
   );
}
