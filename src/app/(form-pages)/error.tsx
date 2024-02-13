"use client";

import { Button } from "@mui/material";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
   return (
      <div className="text-center">
         <p>
            An error occured
            <br />
            <strong>{error.message}</strong>
            <br />
            <Button sx={{ mt: 2 }} onClick={reset}>
               Try again
            </Button>
         </p>
      </div>
   );
}
