import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import HeroGraphics from "./HeroGraphics";

export default function OldHero() {
   return (
      <Grid
         container
         alignItems="center"
         justifyContent="center"
         sx={{
            flexWrap: { md: "nowrap" },
            gap: { xs: 4, md: 1 },
            mt: 2.5,
            px: { xs: 2.5, sm: 4 },
            py: 4,
            backgroundColor: "secondary.light",
            borderRadius: "10px",
            minHeight: "60vh",
            overflow: "hidden",
         }}
      >
         <Grid item xs={12} md="auto" sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
               <Typography variant="h4">No Res? No Problem</Typography>
               <Typography
                  className="max-w-xs"
                  sx={{ my: 2, mx: { xs: "auto", md: "0" } }}
               >
                  Browse through countless accomodation listings available
                  exclusively to uni students in Zimbabwe
               </Typography>
               <div>
                  <Button component={Link} href="/accomodation">
                     Browse Accomodation
                  </Button>
               </div>
            </Box>
         </Grid>

         <Grid item xs={12} md="auto" sx={{ order: { xs: 1, md: 2 } }}>
            <div className="relative ">
               <Box
                  sx={{
                     display: { xs: "none", md: "block" },
                     backgroundColor: "primary.main",
                     position: "absolute",
                     boxShadow: "1px 1px 2px black",
                     width: "15rem",
                     height: "100rem",
                     right: "50%",
                     bottom: "-90%",
                     transform: "rotate(-20deg)",
                     borderRadius: "10px",
                  }}
               />

               <HeroGraphics />
            </div>
         </Grid>
      </Grid>
   );
}
