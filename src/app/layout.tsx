import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import Providers from "@/Contexts/Providers";

export const metadata: Metadata = {
   title: "Off-Campus",
   description: "Find/advertising college students' acccomodation in Zimbabwe",
};

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en">
         <body>
            <Providers children={children} />
         </body>
      </html>
   );
}
