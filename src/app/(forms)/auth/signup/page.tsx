"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import AuthProviders from "@/components/auth/AuthProviders";
import EmailAndPasswordForm from "@/components/auth/EmailAndPasswordForm";
import DetailsForm from "@/components/auth/DetailsForm";
import LoginSignupPromptAndFinishBtn from "@/components/auth/LoginSignupPromptAndFinishBtn";

export default function Signup() {
   const [submitting, setSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [step, setStep] = useState(1);
   const router = useRouter();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmitting(true);
      const formData = new FormData(e.currentTarget);

      function loginUser(data: FormData): any {
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

      if (step === 1) {
         const res = await loginUser(formData);
         if (res.error) {
            setErrorMessage(res.error);
         } else {
            console.log("new user created", res.message);
            setStep(2);
         }
         setSubmitting(false);
      } else if (step === 2) {
         const res = await setUserDetails(formData);
         if (res.error) {
            setErrorMessage(res.error);
            setSubmitting(false);
         } else {
            console.log("user details set successfully", res.message);
            router.push("/profile/" + 23146223);
         }
      } else throw Error(`signup step ${step} is not valid`);
   }

   return (
      <AuthForm
         errorMessage={errorMessage}
         submitting={submitting}
         handleSubmit={handleSubmit}
         title="signup"
      >
         {step === 1 ? (
            <>
               <AuthProviders />
               <EmailAndPasswordForm />
               <LoginSignupPromptAndFinishBtn currentPage="signup" />
            </>
         ) : (
            <DetailsForm />
         )}
      </AuthForm>
   );
}
