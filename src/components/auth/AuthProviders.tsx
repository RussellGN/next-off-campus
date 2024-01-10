import { Apple, Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthProviders() {
   const router = useRouter();

   function providerLogin() {
      router.push("/profile/133");
   }

   return (
      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
         <Button
            onClick={providerLogin}
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
            onClick={providerLogin}
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
