"use client";

import Listings from "@/components/accomodation/Listings";
import SearchAndSort from "@/components/accomodation/SearchAndSort";
import Sidebar from "@/components/accomodation/Sidebar";
import useIsMobile from "@/hooks/useIsMobile";
import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
   const [filtersFormNumber, setFiltersFormNumber] = useState(1);
   const [showSidebar, setShowSidebar] = useState(false);
   const isMobile = useIsMobile();

   useEffect(() => {
      function closeSidebarOnUpscale() {
         if (isMobile === false) setShowSidebar(false);
      }

      window.addEventListener("resize", closeSidebarOnUpscale);

      return () => {
         window.removeEventListener("resize", closeSidebarOnUpscale);
      };
   }, [isMobile]);

   function incrementFiltersFormNumber() {
      setFiltersFormNumber((prev) => prev + 1);
   }

   return (
      <Container component="main" sx={{ mt: { xs: 2, md: 5 } }}>
         <Grid container gap={1}>
            <Sidebar
               showSidebar={showSidebar}
               closeSidebar={() => setShowSidebar(false)}
               filtersFormNumber={filtersFormNumber}
               incrementFiltersFormNumber={incrementFiltersFormNumber}
            />
            <Grid item xs={12} md>
               <Box sx={{ p: 2 }}>
                  <SearchAndSort
                     openSidebar={() => setShowSidebar(true)}
                     incrementFiltersFormNumber={incrementFiltersFormNumber}
                  />
                  <Listings />
               </Box>
            </Grid>
         </Grid>
      </Container>
   );
}
