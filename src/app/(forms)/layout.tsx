import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import Providers from "@/Contexts/Providers";
import "../globals.css";
import { Paper } from "@mui/material";
import { FormsBackground } from "@/components/layout/FormsBackground";

export const metadata: Metadata = {
   title: "Off-Campus",
   description: "Find/advertising college students' acccomodation in Zimbabwe",
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en">
         <body className="min-h-screen">
            <Providers>
               <FormsBackground>
                  <Paper
                     elevation={8}
                     sx={{
                        borderRadius: "15px",
                        p: 5,
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
            </Providers>
         </body>
      </html>
   );
}
