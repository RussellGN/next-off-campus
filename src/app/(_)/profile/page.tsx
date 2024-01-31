import { fetchTags } from "@/constants";
import { ListerInterface, ListingInterface } from "@/interfaces";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Profile from "@/components/profile/Profile";

export default async function Page() {
   const token = cookies().get("token");
   if (!token) redirect("/auth/login");

   const { lister, lister_listings } = await getLister();

   return <Profile lister={lister} lister_listings={lister_listings} />;
}

export async function getLister() {
   const baseURL = "http://127.0.0.1:8000";
   const apiURL = baseURL + "/api";
   const token = cookies().get("token");
   if (!token) redirect("/auth/login");

   const res = await fetch(`${apiURL}/auth/`, {
      headers: { Authorization: `Token ${token.value}` },
      next: { tags: [fetchTags.listerProfile] },
   });

   if (!res.ok) throw new Error(`failed to fetch profile details: ${res.statusText}`);

   const data = (await res.json()) as {
      lister: ListerInterface;
      lister_listings: ListingInterface[];
   };
   data.lister_listings.forEach((listing) =>
      listing.images.forEach((img) => (img.image = baseURL + img.image))
   );

   return data;
}
