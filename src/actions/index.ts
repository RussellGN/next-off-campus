"use server";

import { ListerInterface, ListingInterface } from "@/interfaces";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchTags } from "@/constants";
import { revalidateTag } from "next/cache";

const BASE_URL = "http://127.0.0.1:8000";
const API_URL = "http://127.0.0.1:8000/api";

export async function loginAction(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      body: formData,
   });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`login failed: ${res.statusText} \n Details: ${errorDetails}`);
   }
   const data = (await res.json()) as { lister: ListerInterface; message: string; token: string };

   cookies().set("token", data.token);
   console.log(data);
   redirect("/profile");
}

export async function signupActionOld(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/signup/`, {
      method: "POST",
      body: formData,
   });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`signup failed: ${res.statusText} \n Details: ${errorDetails}`);
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
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`signup failed: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { lister: ListerInterface; message: string; token: string };
   cookies().set("token", data.token);
   console.log(data);
}

export async function getListerAction() {
   const token = cookies().get("token");
   if (!token) redirect("/auth/login");

   const res = await fetch(`${API_URL}/auth/`, {
      headers: { Authorization: `Token ${token.value}` },
      next: { tags: [fetchTags.listerProfile] },
   });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to fetch profile details: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as {
      lister: ListerInterface;
      lister_listings: ListingInterface[];
   };
   data.lister_listings.forEach((listing) => listing.images.forEach((img) => (img.image = BASE_URL + img.image)));

   return data;
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
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to update details: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { lister: ListerInterface; message: string };
   console.log(data);
   redirect("/profile");
}

export async function getListingsAction() {
   const res = await fetch(`${API_URL}/listings/`, { next: { tags: ["listings"] } });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to get listings: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { listings: ListingInterface[] };
   data.listings.forEach((listing) => listing.images.forEach((img) => (img.image = BASE_URL + img.image)));

   return data;
}

export async function getListingAction(slug: string) {
   const res = await fetch(`${API_URL}/listings/${slug}`, { next: { tags: [slug] } });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to get listing: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; related_listings: ListingInterface[] };
   data.listing.images.forEach((img) => (img.image = BASE_URL + img.image));

   return data.listing;
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
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to create new listing: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; message: string };
   console.log(data);
   revalidateTag(fetchTags.listings);
   return data;
   // redirect("/profile");
}

export async function updateListingAction(slug: string, formData: FormData) {
   const res = await fetch(`${API_URL}/listings/${slug}/`, {
      method: "PATCH",
      body: formData,
      headers: {
         Authorization: `Token ${cookies().get("token")?.value}`,
      },
   });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to update listing: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; message: string };
   console.log(data);
   revalidateTag(fetchTags.detailedListing);
   revalidateTag(fetchTags.listerProfile);
   revalidateTag(fetchTags.listings);
   return data;
}

export async function deleteListingAction(slug: string) {
   const res = await fetch(`${API_URL}/listings/${slug}/`, {
      method: "DELETE",
      headers: {
         Authorization: `Token ${cookies().get("token")?.value}`,
      },
   });

   if (!res.ok) {
      const errorData = await res.json();
      const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
      console.log(errorDetails);
      throw new Error(`failed to delete listing: ${res.statusText} \n Details: ${errorDetails}`);
   }

   const data = (await res.json()) as { message: string };
   console.log(data);
   revalidateTag(fetchTags.detailedListing);
   revalidateTag(fetchTags.listerProfile);
   revalidateTag(fetchTags.listings);
   return data;
}
