"use server";

import { ListerInterface, ListingInterface } from "@/interfaces";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_URL = "http://127.0.0.1:8000/api";

export async function loginAction(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      body: formData,
   });

   if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData ? errorData : "No response from server");
      throw new Error(`login failed: ${res.statusText}`);
   }
   const data = (await res.json()) as { lister: ListerInterface; message: string; token: string };

   cookies().set("token", data.token);
   console.log(data);
   redirect("/profile");
}

export async function signupAction(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/signup/`, {
      method: "POST",
      body: formData,
   });

   if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData ? errorData : "No response from server");
      throw new Error(`signup failed: ${res.statusText}`);
   }

   const data = (await res.json()) as { lister: ListerInterface; message: string; token: string };
   cookies().set("token", data.token);
   console.log(data);
   redirect("/profile");
}

export async function updateListerAction(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/`, {
      method: "PATCH",
      body: formData,
      headers: {
         Authorization: `Token ${cookies().get("token")?.value}`,
      },
   });

   if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData ? errorData : "No response from server");
      throw new Error(`failed to update details: ${res.statusText}`);
   }

   const data = (await res.json()) as { lister: ListerInterface; message: string };
   console.log(data);
   // redirect("/profile");
}

export async function createListingAction(formData: FormData) {
   const res = await fetch(`${API_URL}/listings/`, {
      method: "POST",
      body: formData,
      headers: {
         Authorization: `Token ${cookies().get("token")?.value}`,
      },
   });

   console.log(res);

   if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData ? errorData : "No response from server");
      throw new Error(`failed to create new listing: ${res.statusText}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; message: string };
   console.log(data);
   redirect("/profile");
}

export async function updateListingAction(slug: string, formData: FormData) {
   console.log(`Tokennnnnnnnn: ${cookies().get("token")?.value}`);
   const res = await fetch(`${API_URL}/listings/${slug}/`, {
      method: "PATCH",
      body: formData,
      headers: {
         Authorization: `Token ${cookies().get("token")?.value}`,
      },
   });

   if (!res.ok) throw new Error(`failed to update listing: ${res.statusText}`);

   const data = (await res.json()) as { listing: ListingInterface; message: string };
   console.log(data);
   // redirect("/profile");
}
