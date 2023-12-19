import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import Providers from "@/Contexts/Providers";
import "./globals.css";

export const metadata: Metadata = {
   title: "Off-Campus",
   description: "Find/advertising college students' acccomodation in Zimbabwe",
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en">
         <body className="min-h-screen">
            <Providers children={children} />
         </body>
      </html>
   );
}
