"use client";

import React, { useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import AuthProviders from "@/components/auth/AuthProviders";
import EmailAndPasswordForm from "@/components/auth/EmailAndPasswordForm";
import DetailsForm from "@/components/auth/DetailsForm";
import LoginSignupPromptAndFinishBtn from "@/components/auth/LoginSignupPromptAndFinishBtn";
import API from "@/lib/API";
import { getCookie, setCookie } from "@/lib/utils";
import { signupAction } from "@/actions";

export default function Signup() {
   const [submitting, setSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const formDataRef = useRef(new FormData());
   const [step, setStep] = useState(1);
   const router = useRouter();

   const token = getCookie("token");
   if (token) redirect("/profile");

   // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   //    e.preventDefault();
   //    setSubmitting(true);
   //    const formData = new FormData(e.currentTarget);

   //    function loginUser(data: FormData): any {
   //       const formDataObject: any = {};

   //       setTimeout(() => {
   //          for (const entry of data.entries()) {
   //             const [name, value] = entry;

   //             if (formDataObject[name]) {
   //                formDataObject[name] += "," + value;
   //             } else formDataObject[name] = value;
   //          }
   //       }, 3000);

   //       return { error: null, message: formDataObject };
   //    }

   //    function setUserDetails(data: FormData): any {
   //       const formDataObject: any = {};

   //       setTimeout(() => {
   //          for (const entry of data.entries()) {
   //             const [name, value] = entry;

   //             if (formDataObject[name]) {
   //                formDataObject[name] += "," + value;
   //             } else formDataObject[name] = value;
   //          }
   //       }, 3000);

   //       return { error: null, message: formDataObject };
   //    }

   //    if (step === 1) {
   //       const res = await loginUser(formData);
   //       if (res.error) {
   //          setErrorMessage(res.error);
   //       } else {
   //          console.log("new lister created", res.message);
   //          setStep(2);
   //       }
   //       setSubmitting(false);
   //    } else if (step === 2) {
   //       const res = await setUserDetails(formData);
   //       if (res.error) {
   //          setErrorMessage(res.error);
   //          setSubmitting(false);
   //       } else {
   //          console.log("lister details set successfully", res.message);
   //          router.push("/profile/" + 23146223);
   //       }
   //    } else throw Error(`signup step ${step} is not valid`);
   // }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmitting(true);

      if (step === 1) {
         formDataRef.current.set("email", e.currentTarget.email.value);
         formDataRef.current.set("password", e.currentTarget.password.value);
         console.log(formDataRef.current.get("email"));
         console.log(formDataRef.current.get("password"));
         setStep(2);
         setSubmitting(false);
      } else {
         formDataRef.current.set("username", e.currentTarget.username.value);
         formDataRef.current.set("contact_details", e.currentTarget.contact_details.value);
         formDataRef.current.set("lister_type", e.currentTarget.lister_type.value);
         console.log(formDataRef.current.get("username"));
         console.log(formDataRef.current.get("contact_details"));
         console.log(formDataRef.current.get("lister_type"));

         await signupAction(formDataRef.current);

         // const res = await API.signup(formDataRef.current);
         // console.log(res);
         // setCookie("token", res.token, 1);
         // router.push("/profile");
      }
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
