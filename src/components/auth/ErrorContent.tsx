import { Warning } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function ErrorContent({ errorMessage }: { errorMessage: string }) {
   return (
      <>
         <Warning fontSize="large" sx={{ mb: 4 }} />
         <Typography textAlign="center">
            Something went wrong <br />
         </Typography>
         <Typography color="error" textAlign="center">
            {errorMessage}
         </Typography>
         <div>
            <Button component={Link} href={window.location.href}>
               Retry
            </Button>
         </div>
      </>
   );
}
