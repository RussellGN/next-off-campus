"use client";

import { DeleteOutlined, Edit } from "@mui/icons-material";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   IconButton,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ListerOptions({
   listingtitle,
   listingSlug,
}: {
   listingtitle: string;
   listingSlug: string;
}) {
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
   const pathname = usePathname();

   function confirmDelete() {
      alert("deleted listing with slug: " + listingSlug);
      hideDeleteDialog();
   }

   const showDeleteDialog = () => setOpenDeleteDialog(true);
   const hideDeleteDialog = () => setOpenDeleteDialog(false);

   if (pathname.includes("/profile"))
      return (
         <>
            <DeleteDialog
               {...{ openDeleteDialog, hideDeleteDialog, confirmDelete, listingtitle }}
            />

            <IconButton onClick={showDeleteDialog} size="small" sx={{ ml: 1 }}>
               <DeleteOutlined />
            </IconButton>
            <IconButton component={Link} href={"/listing-form/" + listingSlug} size="small">
               <Edit />
            </IconButton>
         </>
      );
}

function DeleteDialog({
   openDeleteDialog,
   hideDeleteDialog,
   listingtitle,
   confirmDelete,
}: {
   openDeleteDialog: boolean;
   hideDeleteDialog: () => void;
   listingtitle: string;
   confirmDelete: () => void;
}) {
   return (
      <Dialog
         open={openDeleteDialog}
         onClose={hideDeleteDialog}
         aria-labelledby="logout-dialog-title"
         aria-describedby="logout-dialog-description"
         maxWidth="xs"
         sx={{ textAlign: "center" }}
      >
         <DialogTitle noWrap id="logout-dialog-title" sx={{ pt: 3 }}>
            Delete Confirmation
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="logout-dialog-description">
               Are you sure you want to delete listing with title: "{listingtitle}" ?
            </DialogContentText>
         </DialogContent>
         <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button onClick={hideDeleteDialog}>Cancel</Button>
            <Button variant="outlined" color="secondary" onClick={confirmDelete}>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   );
}
