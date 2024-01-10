"use client";

import Link from "next/link";
import { Link as MuiLink, SxProps, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import useIsMobile from "@/hooks/useIsMobile";
export default function NavLink({
   href,
   children,
   includes,
   sx,
}: {
   href: string;
   children: ReactNode;
   includes?: string;
   sx?: SxProps;
}) {
   const pathname = usePathname();
   const theme = useTheme();
   const isMobile = useIsMobile();

   let active: boolean = false;
   if (includes) active = pathname.includes(includes);
   else active = pathname === href;

   return (
      <MuiLink
         component={Link}
         href={href}
         sx={{
            textDecoration: "none",
            color: "inherit",
            position: "relative",
            "&::after": {
               position: "absolute",
               bottom: "-4px",
               left: isMobile ? 0 : "50%",
               transform: isMobile ? 0 : "translateX(-50%)",
               content: "''",
               height: "2px",
               width: active ? "70%" : 0,
               borderRadius: "10px",
               transition: "all 0.2s",
               backgroundColor: theme.palette.text.primary,
            },
            "&:hover::after": {
               width: "70%",
            },
            ...sx,
         }}
      >
         {children}
      </MuiLink>
   );
}
