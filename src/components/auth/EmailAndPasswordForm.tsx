import { TextField } from "@mui/material";

export default function EmailAndPasswordForm() {
   return (
      <>
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
            inputProps={{
               minLength: 8,
               maxLength: 20,
            }}
            required
            fullWidth
         />
      </>
   );
}
