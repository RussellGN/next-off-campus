"use client";

import { wait } from "@/lib/utils";
import { Apple, Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function AuthProviders() {
   async function providerLogin() {
      await wait(0.5);
      alert("this feature has not been implemented yet");
      // const formData = new FormData();
      // formData.append("email", "russ@gmail.com");
      // formData.append("password", "123456789");
      // await loginAction(formData);
   }

   return (
      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
         <Button
            onClick={() => void providerLogin()}
            startIcon={<Google />}
            color="secondary"
            variant="outlined"
            sx={{
               borderRadius: "20px",
               width: "50%",
               maxWidth: "10rem",
            }}
         >
            Google
         </Button>

         <Button
            onClick={() => void providerLogin()}
            startIcon={<Apple />}
            color="secondary"
            variant="outlined"
            sx={{
               borderRadius: "20px",
               width: "50%",
               maxWidth: "10rem",
            }}
         >
            Apple
         </Button>
      </Box>
   );
}
