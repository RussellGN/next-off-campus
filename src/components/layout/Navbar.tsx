import { Box } from "@mui/material";
import AnimatedHeader from "./AnimatedHeader";
import Logo from "../Logo";
import MobileNavigation from "./MobileNavigation";
import { navLinks } from "@/constants";
import NavLink from "../NavLink";
import ListerAvatarOrSignup from "./ListerAvatarOrSignup";

export default async function Navbar() {
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
                        <NavLink
                           href={navLink.path}
                           includes={navLink.path === "/accomodation" ? navLink.path : undefined}
                        >
                           {navLink.label}
                        </NavLink>
                     </Box>
                  ))}
                  <li>
                     <ListerAvatarOrSignup />
                  </li>
                  <MobileNavigation />
               </ul>
            </Box>
         </div>
      </AnimatedHeader>
   );
}
