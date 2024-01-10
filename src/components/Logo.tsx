import { Home, HomeOutlined, HotelRounded } from "@mui/icons-material";
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
         // className="flex items-center gap-2"
         className="flex items-center"
      >
         <Home
            sx={{
               mt: -0.5,
               mr: 0.2,
            }}
            fontSize="medium"
            color="primary"
         />
         {/* <HotelRounded
            sx={{
               transform: "rotateY(180deg)",
            }}
            fontSize="medium"
            color="primary"
         /> */}
         Off-Campus
      </Typography>
   );
}
