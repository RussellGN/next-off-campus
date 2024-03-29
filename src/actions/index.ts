"use server";

import { ListerInterface, ListingInterface } from "@/interfaces";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchTags, API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

async function getErrorDetails(res: Response) {
   const errorDetails = JSON.stringify(await res.json());
   console.log(errorDetails);

   return errorDetails;
}

export async function loginAction(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      body: formData,
   });

   if (!res.ok) {
      throw new Error(`login failed: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }
   const data = (await res.json()) as { lister: ListerInterface; message: string; token: string };

   cookies().set("token", data.token);
   console.log(data);
   redirect("/profile");
}

// export async function signupActionOld(formData: FormData) {
//    const res = await fetch(`${API_URL}/auth/signup/`, {
//       method: "POST",
//       body: formData,
//    });

//    if (!res.ok) {
//       const errorData = await res.json();
//       const errorDetails = errorData ? JSON.stringify(errorData) : "No response from server";
//       console.log(errorDetails);
//       throw new Error(`signup failed: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
//    }

//    const data = (await res.json()) as { lister: ListerInterface; message: string; token: string };
//    cookies().set("token", data.token);
//    console.log(data);
//    redirect("/profile");
// }

export async function signupAction(formData: FormData) {
   const res = await fetch(`${API_URL}/auth/signup/`, {
      method: "POST",
      body: formData,
   });

   if (!res.ok) {
      throw new Error(`signup failed: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
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
      throw new Error(`failed to fetch profile details: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as {
      lister: ListerInterface;
      lister_listings_length: number;
   };

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
      throw new Error(`failed to update details: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as { lister: ListerInterface; message: string };
   console.log(data);
   revalidateTag(fetchTags.listerProfile);
   redirect("/profile");
}

export async function getListingsAction() {
   const res = await fetch(`${API_URL}/listings/`, { next: { tags: ["listings"] } });

   if (!res.ok) {
      throw new Error(`failed to get listings: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as { listings: ListingInterface[]; page_count: number };

   return data;
}

export async function getListingAction(slug: string) {
   const res = await fetch(`${API_URL}/listings/${slug}`, { next: { tags: [slug] } });

   if (!res.ok) {
      throw new Error(`failed to get listing: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; related_listings: ListingInterface[] };

   return data;
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
      throw new Error(`failed to create new listing: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; message: string };
   console.log(data);
   revalidateTag(fetchTags.listings);
   return data;
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
      throw new Error(`failed to update listing: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as { listing: ListingInterface; message: string };
   console.log(data);
   revalidateTag(slug);
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
      throw new Error(`failed to delete listing: ${res.statusText} \n Details: ${await getErrorDetails(res)}`);
   }

   const data = (await res.json()) as { message: string };
   console.log(data);
   revalidateTag(slug);
   revalidateTag(fetchTags.listerProfile);
   revalidateTag(fetchTags.listings);
   return data;
}
