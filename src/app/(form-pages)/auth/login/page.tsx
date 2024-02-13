"use client";

import { FormEvent, useState } from "react";
import AuthProviders from "@/components/auth/AuthProviders";
import { loginAction } from "@/actions";
import { Link as MuiLink, Button, Grid, Link, TextField, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { KeyboardArrowLeft } from "@mui/icons-material";

export default function Signup() {
   // notAuthenticated(); // protect this route from authenticated users

   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const goBack = () => router.back();

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      await loginAction(formData);
   }

   if (loading) return <CircularProgress />;

   return (
      <form onSubmit={handleSubmit} className="w-full">
         <Button type="button" onClick={goBack} color="secondary" variant="outlined" startIcon={<KeyboardArrowLeft />}>
            Back
         </Button>

         <Typography variant="h6" textAlign="center" sx={{ my: 4 }}>
            Login
         </Typography>

         <div className="flex flex-col justify-center items-center gap-4">
            <AuthProviders />

            <TextField
               size="small"
               label="Email"
               name="email"
               type="email"
               placeholder="example@example.com"
               required
               fullWidth
            />

            <TextField
               size="small"
               label="Password"
               name="password"
               type="password"
               placeholder="8+ alphanumeric characters"
               inputProps={{ minLength: 8, maxLength: 20 }}
               required
               fullWidth
            />

            <Grid container gap={3} alignItems="center" justifyContent="space-between" sx={{ p: 1, width: "100%" }}>
               <Grid item xs>
                  <Typography variant="body2">
                     Don&apos;t have an account? <br />
                     <MuiLink component={Link} href="/auth/signup">
                        Signup
                     </MuiLink>
                  </Typography>
               </Grid>

               <Grid item xs="auto">
                  <Button type="submit">Submit</Button>
               </Grid>
            </Grid>
         </div>
      </form>
   );
}
