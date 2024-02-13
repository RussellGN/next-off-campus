import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import Providers from "@/Providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
   title: "Off-Campus",
   description: "Find/advertise acccomodation for college students in Zimbabwe",
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en">
         <Providers>
            <body className="min-h-screen">{children}</body>
         </Providers>
      </html>
   );
}
