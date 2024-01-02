import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { imagesDescriptive } from "../../assets/static-images/images";
import Link from "next/link";

export default function cta() {
   return (
      <Box
         sx={{
            borderRadius: "15px",
            overflow: "hidden",
            backgroundColor: "primary.main",
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "20rem",
            my: 15,
            p: { xs: 2, sm: 4, md: 5 },
            boxShadow: "1px 1px 4px gray",
         }}
      >
         <Image
            alt="graphics"
            src={imagesDescriptive.apartments}
            style={{
               width: "35rem",
               height: "auto",
               position: "absolute",
               right: "-5rem",
               top: "5rem",
            }}
         />

         <div className="relative text-white flex flex-col justify-center h-full gap-5">
            <Typography variant="h6">
               Now lets find a place <br /> to stay!
            </Typography>
            <div>
               <Button color="secondary" component={Link} href="/accomodation">
                  Browse Accomodation
               </Button>
            </div>
         </div>
      </Box>
   );
}
