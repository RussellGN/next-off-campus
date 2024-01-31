"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import EmailAndPasswordForm from "@/components/auth/EmailAndPasswordForm";
import AuthProviders from "@/components/auth/AuthProviders";
import LoginSignupPromptAndFinishBtn from "@/components/auth/LoginSignupPromptAndFinishBtn";
import AuthForm from "@/components/auth/AuthForm";
import API from "@/lib/API";
import { getCookie, setCookie } from "@/lib/utils";
import { loginAction } from "@/actions";

export default function Page() {
   const [submitting, setSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
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

   //    const res = await loginUser(formData);
   //    if (res.error) {
   //       setErrorMessage(res.error);
   //       setSubmitting(false);
   //    } else {
   //       console.log("login successful", res.message);
   //       router.push("/profile/" + 23146223);
   //    }
   // }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmitting(true);
      const formData = new FormData(e.currentTarget);
      await loginAction(formData);
      // const email = formData.get("email") as string;
      // const password = formData.get("password") as string;

      // const res = await API.login(email, password);
      // console.log(res);
      // setCookie("token", res.token, 1);
      // router.push("/profile");
      // if (res.error) {
      //    setErrorMessage(res.error);
      //    setSubmitting(false);
      // } else {
      //    console.log("login successful", res.message);
      //    router.push("/profile/" + 23146223);
      // }
   }

   return (
      <AuthForm
         errorMessage={errorMessage}
         submitting={submitting}
         handleSubmit={handleSubmit}
         title="login"
      >
         <AuthProviders />
         <EmailAndPasswordForm />
         <LoginSignupPromptAndFinishBtn currentPage="login" />
      </AuthForm>
   );
}
