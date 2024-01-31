import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import Providers from "@/Contexts/Providers";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Container } from "@mui/material";

export const metadata: Metadata = {
   title: "Off-Campus",
   description: "Find/advertising college students' acccomodation in Zimbabwe",
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en">
         <Providers>
            <body className="min-h-screen">
               <Navbar />
               <Container component="main">{children}</Container>
               <Footer />
            </body>
         </Providers>
      </html>
   );
}
