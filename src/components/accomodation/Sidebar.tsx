"use client";

import { radioCheckFilters, zIndices } from "@/constants";
import useIsMobile from "@/hooks/useIsMobile";
import { Close, RestoreOutlined } from "@mui/icons-material";
import { IconButton, Button, Grid, Typography, useTheme, SxProps } from "@mui/material";
import useFilters from "@/hooks/useFilters";
import RadioCheckFilter from "./RadioCheckFilter";

export default function Sidebar({
   filtersFormNumber,
   incrementFiltersFormNumber,
   showSidebar = true,
   closeSidebar,
}: {
   filtersFormNumber: number;
   incrementFiltersFormNumber: () => void;
   showSidebar: boolean;
   closeSidebar: () => void;
}) {
   const theme = useTheme();
   const isMobile = useIsMobile();
   const { handleSubmission, resetFilters } = useFilters();

   const mobileStyles: SxProps = {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100vh",
      overflowY: "auto",
      zIndex: zIndices.mobileSidebar,
      backgroundColor: theme.palette.background.paper,
   };
   const desktopStyles: SxProps = {
      position: "sticky",
      top: "90px",
      borderRadius: "10px",
      height: "75vh",
      boxShadow: { md: theme.shadows[4] },
   };

   return (
      <Grid
         component="aside"
         item
         xs={12}
         md={3}
         sx={{
            display: { xs: showSidebar ? "block" : "none", md: "block" },
            overflowY: "auto",
            p: 2,
            backgroundColor: "background.paper",
            ...{ ...(isMobile ? mobileStyles : desktopStyles) },
         }}
      >
         <form onSubmit={handleSubmission} key={"form-" + filtersFormNumber}>
            <Typography
               variant="h6"
               sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               Filters
               <span>
                  <IconButton
                     type="button"
                     onClick={() => {
                        closeSidebar();
                        resetFilters();
                        incrementFiltersFormNumber();
                     }}
                  >
                     <RestoreOutlined />
                  </IconButton>
                  <Button onClick={closeSidebar} type="submit" sx={{ ml: 0.8 }}>
                     Apply
                  </Button>
                  <IconButton
                     type="button"
                     onClick={closeSidebar}
                     size="small"
                     sx={{
                        border: "solid thin",
                        ml: 0.8,
                        display: { md: "none" },
                     }}
                  >
                     <Close />
                  </IconButton>
               </span>
            </Typography>

            {radioCheckFilters.map((filter) => (
               <RadioCheckFilter key={filter.name} filter={filter} />
            ))}
         </form>
      </Grid>
   );
}
