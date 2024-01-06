import {
   Box,
   Button,
   FormControlLabel,
   Radio,
   RadioGroup,
   TextField,
   Typography,
} from "@mui/material";

export default function DetailsForm() {
   return (
      <>
         <Typography variant="body2" textAlign="center">
            Account creation was successful. Please enter these details - to be included in all your
            listings.
         </Typography>

         <TextField
            size="small"
            label="Username"
            name="username"
            placeholder="e.g Example Estate Agents"
            inputProps={{
               minLength: 2,
               maxLength: 30,
            }}
            required
            fullWidth
         />

         <TextField
            size="small"
            multiline
            rows={3}
            label="Contact details"
            name="contact-details"
            placeholder="Phone, email, social media and any other means for clients to contact you."
            inputProps={{
               minLength: 5,
               maxLength: 100,
            }}
            required
            fullWidth
         />

         <RadioGroup name="lister-type" defaultValue="agent">
            <div className="flex gap-4 items-center justify-center">
               <FormControlLabel label="Agent" value="agent" control={<Radio size="small" />} />
               <FormControlLabel
                  label="Landlord"
                  value="landlord"
                  control={<Radio size="small" />}
               />
            </div>
         </RadioGroup>

         <Box sx={{ textAlign: "right", p: 1 }}>
            <Button type="submit">Finish</Button>
         </Box>
      </>
   );
}
