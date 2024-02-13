import { PropsWithChildren } from "react";
import { Paper } from "@mui/material";
import { FormsBackground } from "@/components/layout/FormsBackground";

export default function FormsLayout({ children }: PropsWithChildren) {
   return (
      <FormsBackground>
         <Paper
            component="main"
            elevation={8}
            sx={{
               borderRadius: "15px",
               p: 5,
               px: { xs: 3, sm: 5 },
               width: "100%",
               maxWidth: "25rem",
               minHeight: "80vh",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            {children}
         </Paper>
      </FormsBackground>
   );
}
