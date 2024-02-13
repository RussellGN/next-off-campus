import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";

type CustomDialogProps = {
   title: string;
   message: string;
   confirm: () => void;
   show: boolean;
   closeDialog: () => void;
   proceedText?: string;
   cancelText?: string;
};

export default function CustomDialog({
   title,
   message,
   confirm,
   show,
   closeDialog,
   proceedText,
   cancelText,
}: CustomDialogProps) {
   return (
      <Dialog
         open={show}
         onClose={closeDialog}
         aria-labelledby="popup-dialog-title"
         aria-describedby="popup-dialog-description"
         maxWidth="xs"
         sx={{ textAlign: "center" }}
      >
         <DialogTitle noWrap id="popup-dialog-title" sx={{ pt: 3 }}>
            {title}
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="popup-dialog-description">{message}</DialogContentText>
         </DialogContent>
         <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button onClick={closeDialog}>{cancelText ?? "Cancel"}</Button>
            <Button variant="outlined" color="secondary" onClick={confirm}>
               {proceedText ?? "Yes"}
            </Button>
         </DialogActions>
      </Dialog>
   );
}
