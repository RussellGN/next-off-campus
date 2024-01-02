"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
export default function AnimatedHeader({ children }: PropsWithChildren) {
   const [bodyScrolled, setBodyScrolled] = useState(false);
   const scrollBreakpoint = 15;
   const theme = useTheme();

   useEffect(() => {
      function handleBodyScrolled() {
         if (window.scrollY > scrollBreakpoint) setBodyScrolled(true);
         else setBodyScrolled(false);
      }

      window.addEventListener("scroll", handleBodyScrolled);

      return () => window.removeEventListener("scroll", handleBodyScrolled);
   }, [scrollBreakpoint]);

   const innerBoxstyles = {
      py: 1.5,
      borderRadius: bodyScrolled ? "" : "10px",
      transition: "box-shadow 0.1s linear",
      background: theme.palette.secondary.light,
      boxShadow: bodyScrolled ? theme.shadows[3] : "",
   };

   return (
      <Container
         component="header"
         maxWidth={bodyScrolled ? false : "lg"}
         sx={{
            mt: 2,
            position: "sticky",
            top: 0,
            zIndex: 100,
            px: bodyScrolled ? "0 !important" : "",
            background: "white",
         }}
      >
         <Box sx={innerBoxstyles}>
            <Container
               sx={{
                  px: {
                     xs: bodyScrolled ? "32px !important" : "",
                     md: bodyScrolled ? `50px !important` : "",
                  },
               }}
            >
               {children}
            </Container>
         </Box>
      </Container>
   );
}
