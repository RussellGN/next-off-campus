"use client";

import { Person } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function ViewCountOrLister({
   views,
   username,
}: {
   views: number;
   username: string;
}) {
   const pathname = usePathname();

   if (pathname.includes("/profile"))
      return (
         <Typography variant="caption" color="primary">
            {`${views} views`}
         </Typography>
      );
   else
      return (
         <Typography variant="caption" color="primary">
            <Person fontSize="inherit" /> {username}
         </Typography>
      );
}
