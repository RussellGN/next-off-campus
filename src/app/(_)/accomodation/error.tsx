"use client";

import { Button } from "@mui/material";
import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
   return (
      <div className="flex items-center justify-center" style={{ minHeight: "50vh" }}>
         <h6 style={{ textAlign: "center" }}>
            An error occured <br />
            <strong>{error.message}</strong>
            <br />
            <br />
            <Button onClick={reset}>Recover</Button>
         </h6>
      </div>
   );
}
