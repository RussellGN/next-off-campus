import { fetchTags } from "@/constants";
import { ListerInterface, ListingInterface } from "@/interfaces";
import { cookies } from "next/headers";

const baseURL = "http://127.0.0.1:8000";
const apiURL = baseURL + "/api";

export async function GET() {
   const token = cookies().get("token");
   if (!token) return Response.json({ lister: null });

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

   return Response.json(data);
}
