import { getListerAction, updateListerAction } from "@/actions";
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { InfoOutlined, Person } from "@mui/icons-material";
import Link from "next/link";
import { onlyAuthenticatedServer } from "@/lib/server-only-utils";

export default async function Signup() {
   onlyAuthenticatedServer(); // protect this route from un-authenticated users
   const { lister } = await getListerAction();

   return (
      <form action={(formData) => void updateListerAction(formData)} className="w-full">
         <Button component={Link} href="/profile" color="secondary" variant="outlined" startIcon={<Person />}>
            Profile
         </Button>

         <Typography variant="h6" textAlign="center" sx={{ my: 4 }}>
            Signup
         </Typography>

         <div className="flex flex-col justify-center items-center gap-4">
            <Typography variant="body2" textAlign="center" sx={{ px: 2 }}>
               <InfoOutlined color="primary" fontSize="small" sx={{ mt: -0.5 }} /> Update as neccessary. <br /> All details
               to be included in all your listings.
            </Typography>

            <TextField
               size="small"
               label="Username"
               name="username"
               placeholder="e.g Example Estate Agents"
               defaultValue={lister.username}
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
               defaultValue={lister.contact_details}
               inputProps={{ minLength: 5, maxLength: 100 }}
               required
               fullWidth
            />

            <RadioGroup row name="lister_type" defaultValue={lister.lister_type}>
               <FormControlLabel label="Agent" value="A" control={<Radio size="small" />} />
               <FormControlLabel label="Landlord" value="L" control={<Radio size="small" />} />
            </RadioGroup>

            <div className="w-full text-right">
               <Button type="submit">Finish</Button>
            </div>
         </div>
      </form>
   );
}
