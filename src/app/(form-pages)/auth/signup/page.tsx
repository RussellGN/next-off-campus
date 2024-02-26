"use client";

import { FormEvent, useState } from "react";
import AuthProviders from "@/components/auth/AuthProviders";
import { signupAction, updateListerAction } from "@/actions";
import {
   Link as MuiLink,
   Button,
   FormControlLabel,
   Grid,
   Link,
   Radio,
   RadioGroup,
   TextField,
   Typography,
   CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { InfoOutlined, KeyboardArrowLeft } from "@mui/icons-material";

export default function Signup() {
   // notAuthenticated(); // protect this route from authenticated users

   const [step, setStep] = useState<1 | 2>(1);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const goBack = () => router.back();

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      if (step === 1) {
         await signupAction(formData);
         alert("signup successfull! please fill in remaining details");
         setStep(2);
         setLoading(false);
      } else {
         await updateListerAction(formData);
      }
   }

   if (loading) return <CircularProgress />;

   return (
      <form onSubmit={(e) => void handleSubmit(e)} className="w-full">
         <Button type="button" onClick={goBack} color="secondary" variant="outlined" startIcon={<KeyboardArrowLeft />}>
            Back
         </Button>

         <Typography variant="h6" textAlign="center" sx={{ my: 4 }}>
            Signup
         </Typography>

         {step === 1 && (
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
                        Already have an account? <br />
                        <MuiLink component={Link} href="/auth/login">
                           Login
                        </MuiLink>
                     </Typography>
                  </Grid>

                  <Grid item xs="auto">
                     <Button type="submit">Next</Button>
                  </Grid>
               </Grid>
            </div>
         )}

         {step === 2 && (
            <div className="flex flex-col justify-center items-center gap-4">
               <Typography variant="body2" textAlign="center" sx={{ px: 2 }}>
                  <InfoOutlined color="primary" fontSize="small" sx={{ mt: -0.5 }} /> Please enter these details <br /> to
                  be included in all your listings.
               </Typography>

               <TextField
                  size="small"
                  label="Username"
                  name="username"
                  placeholder="e.g Example Estate Agents"
                  inputProps={{ minLength: 2, maxLength: 30 }}
                  required
                  fullWidth
               />

               <TextField
                  size="small"
                  multiline
                  rows={3}
                  label="Contact details"
                  name="contact_details"
                  placeholder="Phone, email, social media and any other means for clients to contact you."
                  inputProps={{ minLength: 5, maxLength: 100 }}
                  required
                  fullWidth
               />

               <RadioGroup row name="lister_type" defaultValue={"A"}>
                  <FormControlLabel label="Agent" value="A" control={<Radio size="small" />} />
                  <FormControlLabel label="Landlord" value="L" control={<Radio size="small" />} />
               </RadioGroup>

               <div className="w-full text-right">
                  <Button type="submit">Finish</Button>
               </div>
            </div>
         )}
      </form>
   );
}
