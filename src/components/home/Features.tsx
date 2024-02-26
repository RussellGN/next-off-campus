import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { imagesDescriptive } from "../../assets/static-images/images";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function features() {
   return (
      <Box
         component="section"
         className="flex flex-col items-center justify-center gap-3 text-center"
         sx={{ minHeight: { xs: "60vh", md: "70vh" } }}
      >
         <Image
            alt="graphics"
            src={imagesDescriptive.flags as StaticImport}
            style={{
               maxWidth: "15rem",
               position: "relative",
               bottom: "-4rem",
            }}
         />
         <Typography variant="h6"> Landlords &amp; Agencies</Typography>
         <Typography className="max-w-md" sx={{ my: 2, px: 2 }}>
            Do you have accomodation to advertise? Create a free account and upload your listings.
         </Typography>

         <div>
            <Button component={Link} href="/auth/signup">
               Get Listed
            </Button>
         </div>
      </Box>
   );
}
