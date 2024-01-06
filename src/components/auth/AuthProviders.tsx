import { Apple, Google } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function AuthProviders() {
   return (
      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
         <Button
            onClick={() => alert("This feature has not been implemented yet")}
            startIcon={<Google />}
            color="secondary"
            sx={{
               borderRadius: "20px",
               width: "50%",
               maxWidth: "10rem",
            }}
         >
            Google
         </Button>

         <Button
            onClick={() => alert("This feature has not been implemented yet")}
            startIcon={<Apple />}
            color="secondary"
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
