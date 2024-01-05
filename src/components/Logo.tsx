import { HotelRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function Logo() {
   return (
      <Typography
         component={Link}
         href="/"
         color="rgb(100,100,100)"
         fontWeight="bold"
         variant="body1"
         className="flex items-center gap-2"
      >
         <HotelRounded
            sx={{
               transform: "rotateY(180deg)",
            }}
            fontSize="medium"
            color="inherit"
         />
         off campus
      </Typography>
   );
}
