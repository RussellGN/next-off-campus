import { Box, Button } from "@mui/material";
import AnimatedHeader from "./AnimatedHeader";
import Logo from "../Logo";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";
import { navLinks } from "@/constants";

export default function Navbar() {
   return (
      <AnimatedHeader>
         <div className="flex items-center justify-between">
            <Logo />

            <Box component="nav">
               <ul className="list-none flex items-center gap-1 sm:gap-4">
                  {navLinks.map((navLink) => (
                     <Box
                        component="li"
                        key={navLink.path}
                        sx={{ display: { xs: "none", md: "inline-block" } }}
                     >
                        <Link href={navLink.path}>{navLink.label}</Link>
                     </Box>
                  ))}
                  <li>
                     <Button component={Link} href="/signup" sx={{ ml: 2 }}>
                        Signup
                     </Button>
                  </li>
                  <MobileNavigation />
               </ul>
            </Box>
         </div>
      </AnimatedHeader>
   );
}
