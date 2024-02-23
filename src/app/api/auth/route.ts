import { fetchTags } from "@/constants";
import { ListerInterface } from "@/interfaces";
import { cookies } from "next/headers";
import { API_URL } from "@/constants/index";

export async function GET() {
   const token = cookies().get("token");
   if (!token) return Response.json({ lister: null });

   const res = await fetch(`${API_URL}/auth/`, {
      headers: { Authorization: `Token ${token.value}` },
      next: { tags: [fetchTags.listerProfile] },
   });

   if (!res.ok) throw new Error(`failed to fetch profile details: ${res.statusText}`);

   const data = (await res.json()) as {
      lister: ListerInterface;
      lister_listings_length: number;
   };

   return Response.json(data);
}
