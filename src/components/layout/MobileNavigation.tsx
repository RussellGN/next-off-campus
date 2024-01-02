"use client";

import { Drawer, Box, IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import Link from "next/link";
import { navLinks } from "@/constants";
import { useState } from "react";

export default function MobileNavigation() {
   const [isNavOpen, setIsNavOpen] = useState(false);

   function openNav() {
      setIsNavOpen(true);
   }

   function closeNav() {
      setIsNavOpen(false);
   }

   return (
      <>
         <MobileNav isNavOpen={isNavOpen} closeNav={closeNav} />
         <IconButton onClick={openNav} sx={{ display: { md: "none" } }}>
            <Menu />
         </IconButton>
      </>
   );
}

function MobileNav({
   isNavOpen,
   closeNav,
}: {
   isNavOpen: boolean;
   closeNav: () => void;
}) {
   return (
      <Drawer open={isNavOpen} onClose={closeNav} anchor="left">
         <Box
            sx={{
               minWidth: "200px",
               width: "80%",
               p: 2,
               height: "100%",
               display: "flex",
               flexDirection: "column",
            }}
         >
            <div className="text-right">
               <IconButton onClick={closeNav}>
                  <Close />
               </IconButton>
            </div>

            <ul className="list-none flex flex-col justify-center gap-4 my-auto h-fit">
               {navLinks.map((link) => (
                  <li key={link.path} onClick={closeNav}>
                     <Link href={link.path}>{link.label}</Link>
                  </li>
               ))}
            </ul>
         </Box>
      </Drawer>
   );
}