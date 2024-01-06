"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DetailsForm from "@/components/auth/DetailsForm";
import AuthForm from "@/components/auth/AuthForm";

export default function Page() {
   const [submitting, setSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const router = useRouter();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmitting(true);
      const formData = new FormData(e.currentTarget);

      function setUserDetails(data: FormData): any {
         const formDataObject: any = {};

         setTimeout(() => {
            for (const entry of data.entries()) {
               const [name, value] = entry;

               if (formDataObject[name]) {
                  formDataObject[name] += "," + value;
               } else formDataObject[name] = value;
            }
         }, 3000);

         return { error: null, message: formDataObject };
      }

      const res = await setUserDetails(formData);
      if (res.error) {
         setErrorMessage(res.error);
         setSubmitting(false);
      } else {
         console.log("user details updated successfully", res.message);
         router.push("/profile/" + 23146223);
      }
   }

   return (
      <AuthForm
         errorMessage={errorMessage}
         submitting={submitting}
         handleSubmit={handleSubmit}
         title="edit details"
      >
         <DetailsForm />
      </AuthForm>
   );
}
