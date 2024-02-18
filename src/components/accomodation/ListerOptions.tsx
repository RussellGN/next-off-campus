"use client";

import { DeleteOutlined, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CustomDialog from "../CustomDialog";
import { deleteListingAction } from "@/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ListerOptions({ listingTitle, listingSlug }: { listingTitle: string; listingSlug: string }) {
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const pathname = usePathname();

   const router = useRouter();

   const { mutateAsync: deleteListingMutation } = useMutation({
      mutationFn: async () => deleteListingAction(listingSlug),
      onSuccess: ({ message }) => {
         router.refresh();
         console.log(message);
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
               confirm={async () => await deleteListingMutation()}
               show={showDeleteDialog}
               closeDialog={closeDeleteDialog}
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
