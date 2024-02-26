"use client";

import { DeleteOutlined, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CustomDialog from "../CustomDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export default function ListerOptions({
   listingTitle,
   listingSlug,
   listerId,
}: {
   listingTitle: string;
   listingSlug: string;
   listerId: number | string;
}) {
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const pathname = usePathname();

   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutateAsync: deleteListingMutation } = useMutation({
      // mutationFn: async () => deleteListingAction(listingSlug),
      mutationFn: async () => await axios.delete<{ message: string }>("/api/listings/" + listingSlug),
      onSuccess: (res) => {
         void queryClient.invalidateQueries({ queryKey: ["listings", listerId] });
         router.refresh();
         console.log(res.data.message);
         closeDeleteDialog();
      },
   });

   const openDeleteDialog = () => setShowDeleteDialog(true);
   const closeDeleteDialog = () => setShowDeleteDialog(false);

   if (pathname.includes("/profile"))
      return (
         <>
            <CustomDialog
               title="Delete confirmation"
               message={`Are you sure you want to delete the listing titled "${listingTitle}"?`}
               confirm={() => void (async () => await deleteListingMutation())()}
               show={showDeleteDialog}
               closeDialog={closeDeleteDialog}
               showSpinnerOnConfirm
            />

            <IconButton onClick={openDeleteDialog} size="small" sx={{ ml: 1 }}>
               <DeleteOutlined />
            </IconButton>
            <IconButton component={Link} href={"/listing-form/" + listingSlug} size="small">
               <Edit />
            </IconButton>
         </>
      );
}
