import { TextField } from "@mui/material";

export default function EmailAndPasswordForm() {
   return (
      <div className="flex flex-col gap-4 py-4">
         <TextField
            size="small"
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
            // required
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
            // required
            fullWidth
         />
      </div>
   );
}
