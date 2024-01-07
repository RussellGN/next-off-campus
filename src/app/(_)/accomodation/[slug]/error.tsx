"use client";

import React from "react";

export default function Error({ error }: { error: any }) {
   return (
      <div className="flex items-center justify-center" style={{ minHeight: "70vh" }}>
         <h6 style={{ textAlign: "center" }}>
            An error occured <br /> {error.message}
         </h6>
      </div>
   );
}
