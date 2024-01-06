import { Link as MuiLink, Grid, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function LoginSignupPromptAndFinishBtn({
   currentPage,
}: {
   currentPage: "login" | "signup";
}) {
   return (
      <Grid
         container
         spacing={0}
         gap={3}
         alignItems="center"
         justifyContent="space-between"
         sx={{ p: 1, width: "100%" }}
      >
         <Grid item xs>
            <Typography variant="body2">
               {currentPage === "login" ? "Don't have an account?" : "Already have an account?"}
               <br />
               <MuiLink
                  component={Link}
                  href={`/auth/${currentPage === "login" ? "signup" : "login"}`}
               >
                  {currentPage === "login" ? "Signup" : "Login"}
               </MuiLink>
            </Typography>
         </Grid>

         <Grid item xs="auto">
            <Button type="submit">Proceed</Button>
         </Grid>
      </Grid>
   );
}
