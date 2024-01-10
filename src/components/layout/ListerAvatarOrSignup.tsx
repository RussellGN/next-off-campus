"use client";

import { getLister } from "@/lib/dataFetching";
import { generateAvatarLetters } from "@/lib/utils";
import { Avatar, Button, SxProps } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ListerAvatarOrSignup({
   signupSx,
   avatarSx,
}: {
   signupSx?: SxProps;
   avatarSx?: SxProps;
}) {
   const { id } = useParams();

   if (id) {
      const idToFetchWith = id ? Number(id) : 2;
      let lister = getLister(idToFetchWith);

      return (
         <Avatar
            alt={lister.username}
            sx={{
               boxShadow: "1px 1px 4px black",
               color: "white",
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
