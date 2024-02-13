import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { heroListings } from "@/data/heroListings";
import HeroListingCard from "./HeroListingCard";

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
            backgroundColor: "background.paper",
            border: "solid thin",
            borderColor: "divider",
            borderRadius: "10px",
            overflow: "hidden",
         }}
      >
         <Grid item xs={12} md="auto" sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ p: 1, textAlign: { xs: "center", md: "left" } }}>
               <Typography variant="h4">
                  No{" "}
                  <Typography
                     title="Residence on-campus"
                     variant="inherit"
                     component="span"
                     sx={{
                        color: "rgba(0,0,0,0.45)",
                        cursor: "pointer",
                     }}
                  >
                     Res
                  </Typography>
                  ? No Problem
               </Typography>
               <Typography sx={{ maxWidth: "20rem", my: 2, mx: { xs: "auto", md: "0" } }}>
                  Find off-campus accomodation available exclusively to college students <br />
                  in Zimbabwe
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
                     width: "15rem",
                     height: "200rem",
                     position: "absolute",
                     right: { xs: "calc(50% - 13rem)", md: "calc(50% - 7.5rem)" },
                     top: "-100rem",
                     backgroundColor: "primary.main",
                     transform: { xs: "rotate(-50deg)", md: "rotate(-20deg)" },
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
