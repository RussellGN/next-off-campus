"use client";

import useLister from "@/hooks/useLister";
import { generateAvatarLetters } from "@/lib/utils";
import { Avatar, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListerAvatarOrSignup() {
   const { lister, isPending } = useLister();
   const pathname = usePathname();

   if (pathname === "/profile") return;

   if (lister) {
      return (
         <Avatar
            component={Link}
            href="/profile"
            title="go to profile"
            alt={lister.username}
            sx={{
               pointerEvents: isPending ? "none" : "initial",
               border: "solid 1px",
               borderColor: "divider",
               color: "white",
               cursor: "pointer",
               transition: "all 0.1s",
               ml: 2,
               ":hover": {
                  borderStyle: "dotted",
               },
            }}
         >
            {generateAvatarLetters(lister.username)}
         </Avatar>
      );
   } else
      return (
         <Button disabled={isPending} component={Link} href="/auth/signup" sx={{ ml: 2 }}>
            Get Listed
         </Button>
      );
}
