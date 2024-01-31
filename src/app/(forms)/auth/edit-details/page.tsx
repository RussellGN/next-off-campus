"use client";

import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import DetailsForm from "@/components/auth/DetailsForm";
import AuthForm from "@/components/auth/AuthForm";
import { getLister } from "@/lib/dataFetching";
import API from "@/lib/API";
import { ListerInterface, ListingInterface } from "@/interfaces";
import { getCookie } from "@/lib/utils";
import { updateListerAction } from "@/actions";

export default function Page() {
   const [lister, setLister] = useState<ListerInterface | null>();
   const [submitting, setSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const router = useRouter();

   // const token = getCookie("token");
   // if (!token) redirect("/auth/login");

   useEffect(() => {
      async function getAndSetLister() {
         const res = await fetch("/api/auth");
         if (!res.ok) throw new Error("failed to fetch lister");

         const data = (await res.json()) as {
            lister: ListerInterface | null;
            lister_listings?: ListingInterface[];
         };
         setLister(data.lister);
      }

      getAndSetLister();
   }, []);

   // useEffect(() => {
   //    async function getAndSetLister(id: number) {
   //       const res = await API.getLister(id);
   //       setLister(res);
   //    }

   //    if (id) getAndSetLister(id);
   // }, [id]);

   // const lister = getLister(id);

   // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   //    e.preventDefault();
   //    setSubmitting(true);
   //    const formData = new FormData(e.currentTarget);

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

   //    const res = await setUserDetails(formData);
   //    if (res.error) {
   //       setErrorMessage(res.error);
   //       setSubmitting(false);
   //    } else {
   //       console.log("lister details updated successfully", res.message);
   //       router.push("/profile/" + 23146223);
   //    }
   // }

   // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   //    e.preventDefault();
   //    setSubmitting(true);
   //    const formData = new FormData(e.currentTarget);

   //    console.log(formData.get("username"));
   //    console.log(formData.get("contact_details"));
   //    console.log(formData.get("lister_type"));

   //    const res = await API.updateLister(id, formData);
   //    console.log(res);
   //    router.push("/profile");
   // }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setSubmitting(true);
      const formData = new FormData(e.currentTarget);
      console.log(formData.get("username"));
      console.log(formData.get("contact_details"));
      console.log(formData.get("lister_type"));
      await updateListerAction(formData);
      // redirect("/profile");
   }

   if (lister)
      return (
         <AuthForm
            errorMessage={errorMessage}
            submitting={submitting}
            handleSubmit={handleSubmit}
            title="edit details"
         >
            <DetailsForm editing lister={lister} />
         </AuthForm>
      );
}
