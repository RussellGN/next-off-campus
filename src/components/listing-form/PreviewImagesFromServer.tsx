"use client";

import { memo, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AspectContainedNextImage from "../AspectContainedNextImage";

export default memo(
   function PreviewImagesFromServer({ images }: { images: { id: number; image: string }[] }) {
      const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
      const [deletedImageIds, setDeletedImageIds] = useState("");
      const [latestVictim, setLatestVictim] = useState<string | number>("");

      function confirmRemove() {
         setDeletedImageIds((prev) => (prev ? prev + "," + latestVictim : String(latestVictim)));
         hideRemoveDialog();
      }

      function cancelRemove() {
         setLatestVictim("");
         hideRemoveDialog();
      }

      const showRemoveDialog = () => setOpenRemoveDialog(true);
      const hideRemoveDialog = () => setOpenRemoveDialog(false);

      console.log("deleted Image Ids:", deletedImageIds);

      return (
         <>
            <RemoveDialog {...{ openRemoveDialog, hideRemoveDialog, confirmRemove, cancelRemove }} />

            <input
               type="hidden"
               name="deleted_image_ids"
               value={deletedImageIds}
               // onChange={() => null}
            />

            {images.map((img) => {
               const removedIds = deletedImageIds.split(",");
               let shouldReturn = true;
               removedIds.forEach((id) => {
                  if (String(img.id) === id) shouldReturn = false;
               });

               if (shouldReturn)
                  return (
                     <div className="relative" key={"img-" + img.id}>
                        <AspectContainedNextImage src={img.image} alt="preview image" sx={{ borderRadius: "5px" }} />
                        <IconButton
                           onClick={() => {
                              setLatestVictim(img.id);
                              showRemoveDialog();
                           }}
                           color="error"
                           size="small"
                           sx={{
                              transform: "scale(0.8)",
                              backgroundColor: "error.main",
                              color: "white !important",
                              position: "absolute",
                              top: "-5px",
                              right: "-5px",
                              "&:hover": {
                                 backgroundColor: "error.light",
                                 color: "white !important",
                              },
                           }}
                        >
                           <Delete />
                        </IconButton>
                     </div>
                  );
            })}
         </>
      );
   },
   (prevProps, nextProps) => prevProps.images === nextProps.images
);

function RemoveDialog({
   openRemoveDialog,
   confirmRemove,
   cancelRemove,
}: {
   openRemoveDialog: boolean;
   hideRemoveDialog: () => void;
   confirmRemove: () => void;
   cancelRemove: () => void;
}) {
   return (
      <Dialog
         open={openRemoveDialog}
         onClose={cancelRemove}
         aria-labelledby="remove-dialog-title"
         aria-describedby="remove-dialog-description"
         maxWidth="xs"
         sx={{ textAlign: "center" }}
      >
         <DialogTitle noWrap id="remove-dialog-title" sx={{ pt: 3 }}>
            Remove Image
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="remove-dialog-description">
               Are you sure you want to remove this image?
            </DialogContentText>
         </DialogContent>
         <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button onClick={cancelRemove}>Cancel</Button>
            <Button variant="outlined" color="secondary" onClick={confirmRemove}>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   );
}
