"use client";

import { FormEvent, ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import { capitalize } from "@/lib/utils";
import { HomeOutlined } from "@mui/icons-material";
import Link from "next/link";
import { loginAction, signupAction, updateListerAction } from "@/actions";

type AuthFormTypes = {
   formType: "login" | "signup" | "editing";
   children: ReactNode;
   submitHandler?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function AuthForm({ formType, children, submitHandler }: AuthFormTypes) {
   const action = formType === "login" ? loginAction : formType === "signup" ? signupAction : updateListerAction;

   async function defaultSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      await action(formData);
   }

   const onSubmit = submitHandler ? submitHandler : defaultSubmit;

   return (
      <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-6 w-full">
         <div className="w-full">
            <Button component={Link} href="/" color="secondary" variant="outlined" startIcon={<HomeOutlined />}>
               Home
            </Button>
         </div>

         <Typography variant="h6" textAlign="center">
            {capitalize(formType)}
         </Typography>

         {children}
      </form>
   );
}
