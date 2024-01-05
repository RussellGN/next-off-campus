import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { heroListings } from "@/data/heroListings";
import { SimpleListingInterface } from "@/interfaces";
import Image from "next/image";
import AspectRatioContainer from "@/components/AspectRatioContainer";
import { capitalize } from "@/lib/utils";
import { PlaceOutlined } from "@mui/icons-material";

export default function Hero() {
   return (
      <Grid
         container
         alignItems="center"
         justifyContent="center"
         gap={5}
         sx={{
            minHeight: "70vh",
            mt: 2.5,
            px: { xs: 1, sm: 4 },
            py: 6,
            backgroundColor: "secondary.light",
            border: "solid thin",
            borderColor: "divider",
            borderRadius: "10px",
            overflow: "hidden",
         }}
      >
         <Grid item xs={12} md="auto" sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ p: 1, textAlign: { xs: "center", md: "left" } }}>
               <Typography variant="h4">No Res? No Problem</Typography>
               <Typography sx={{ maxWidth: "20rem", my: 2, mx: { xs: "auto", md: "0" } }}>
                  Browse through countless accomodation listings available exclusively to college
                  students in Zimbabwe
               </Typography>
               <div>
                  <Button component={Link} href="/accomodation">
                     Browse Accomodation
                  </Button>
               </div>
            </Box>
         </Grid>

         <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
            <Box sx={{ position: "relative" }}>
               <Box
                  sx={{
                     display: { xs: "none", md: "block" },
                     width: "15rem",
                     height: "200rem",
                     position: "absolute",
                     right: "calc(50% - 7.5rem)",
                     top: "-100rem",
                     backgroundColor: "primary.main",
                     transform: "rotate(-20deg)",
                  }}
               />

               <Box
                  sx={{
                     position: "relative",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  {heroListings.map((listing, index) => (
                     <HeroListingCard key={listing.id} index={index} listing={listing} />
                  ))}
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
}

function HeroListingCard({ listing, index }: { listing: SimpleListingInterface; index: number }) {
   return (
      <Box
         sx={{
            width: "33%",
            p: 0.2,
            borderRadius: "15px",
            backgroundColor: "white",
            boxShadow: "1px 1px 4px grey",
            transform: index === 1 ? "scale(1.2)" : "",
         }}
      >
         <AspectRatioContainer ratio="3/2">
            <Image
               priority
               src={listing.coverImage}
               quality={100}
               height={80}
               width={100}
               alt={listing.title}
               style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px 15px 0 0",
               }}
            />
         </AspectRatioContainer>

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
               variant="caption"
               component="div"
               sx={{
                  my: 1,
                  backgroundColor: "secondary.light",
                  width: "fit-content",
                  mx: "auto",
                  p: "1px 5px",
                  borderRadius: "5px",
               }}
            >
               $ {listing.rent}
            </Typography>
         </Box>
      </Box>
   );
}
