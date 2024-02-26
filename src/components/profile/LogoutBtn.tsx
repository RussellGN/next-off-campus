"use client";

import { deleteCookie } from "@/lib/utils";
import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CustomDialog from "../CustomDialog";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
   const [showLogoutDialog, setShowLogoutDialog] = useState(false);
   const queryClient = useQueryClient();
   const router = useRouter();

   const openLogoutDialog = () => setShowLogoutDialog(true);
   const closeLogoutDialog = () => setShowLogoutDialog(false);

   function confirmLogout() {
      console.log("logging out");
      deleteCookie("token");
      void queryClient.invalidateQueries({ queryKey: ["lister"] });
      router.push("/");
   }

   return (
      <>
         <CustomDialog
            title={"Logout"}
            message={"Are you sure you want to logout?"}
            confirm={confirmLogout}
            show={showLogoutDialog}
            closeDialog={closeLogoutDialog}
            showSpinnerOnConfirm
         />

         <IconButton onClick={openLogoutDialog} title="Logout" size="small">
            <Logout />
         </IconButton>
      </>
   );
}
