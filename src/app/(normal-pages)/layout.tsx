import { PropsWithChildren } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Container } from "@mui/material";

export default function PagesLayout({ children }: PropsWithChildren) {
   return (
      <>
         <Navbar />
         <Container component="main">{children}</Container>
         <Footer />
      </>
   );
}
