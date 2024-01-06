import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Cta from "@/components/home/Cta";
import { Container } from "@mui/material";

export default function Home() {
   return (
      <Container component="main">
         <Hero />
         <Features />
         <Cta />
      </Container>
   );
}
