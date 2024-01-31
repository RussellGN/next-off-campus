"use client";

import { fetchTags } from "@/constants";
import { ListerInterface, ListingInterface } from "@/interfaces";
import API from "@/lib/API";
import { generateAvatarLetters, getCookie } from "@/lib/utils";
import { Avatar, Button } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// export async function getListerOnly() {
//    const baseURL = "http://127.0.0.1:8000";
//    const apiURL = baseURL + "/api";
//    const token = cookies().get("token");
//    if (!token) return null;

//    const res = await fetch(`${apiURL}/auth/`, {
//       headers: { Authorization: `Token ${token.value}` },
//       next: { tags: [fetchTags.listerProfile] },
//    });

//    if (!res.ok) throw new Error(`failed to fetch profile details: ${res.statusText}`);

//    const data = (await res.json()) as {
//       lister: ListerInterface;
//       lister_listings: ListingInterface[];
//    };

//    return data.lister;
// }

export default function ListerAvatarOrSignup() {
   const [lister, setLister] = useState<ListerInterface | null>(null);
   const pathname = usePathname();

   useEffect(() => {
      async function getAndSetLister() {
         const res = await fetch("/api/auth");
         if (!res.ok) throw new Error("failed to fetch lister");

         const data = (await res.json()) as {
            lister: ListerInterface | null;
            lister_listings?: ListingInterface[];
         };
         setLister(data.lister);
      }

      getAndSetLister();
   }, [pathname]);

   if (pathname === "/profile") return;

   if (lister) {
      return (
         <Avatar
            component={Link}
            href="/profile"
            title="go to profile"
            alt={lister.username}
            sx={{
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
         <Button component={Link} href="/auth/signup" sx={{ ml: 2 }}>
            Get Listed
         </Button>
      );
}

/* "use client";

import { ListerInterface } from "@/interfaces";
import API from "@/lib/API";
import { getLister } from "@/lib/dataFetching";
import { generateAvatarLetters } from "@/lib/utils";
import { Avatar, Button, SxProps } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListerAvatarOrSignup({
   signupSx,
   avatarSx,
}: {
   signupSx?: SxProps;
   avatarSx?: SxProps;
}) {
   const [lister, setLister] = useState<ListerInterface>();
   const { id } = useParams();

   useEffect(() => {
      async function getAndSetLister(id: number) {
         const res = await API.getLister(id);
         setLister(res);
      }

      if (id) getAndSetLister(Number(id));
   }, [id]);

   if (lister) {
      return (
         <Avatar
            alt={lister.username}
            sx={{
               border: "solid 1px",
               borderColor: "divider",
               color: "white",
               cursor: "pointer",
               transition: "all 0.1s",
               ":hover": {
                  borderStyle: "dotted",
               },
               ...avatarSx,
            }}
         >
            {generateAvatarLetters(lister.username)}
         </Avatar>
      );
   } else
      return (
         <Button component={Link} href="/auth/signup" sx={signupSx}>
            Get Listed
         </Button>
      );
}
*/
