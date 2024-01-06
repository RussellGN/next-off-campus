import { CircularProgress, Typography } from "@mui/material";

export default function LoadingContent() {
   return (
      <>
         <CircularProgress sx={{ mb: 4 }} />
         <Typography variant="body1" textAlign="center">
            Submitting...Please wait
         </Typography>
      </>
   );
}
