import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(_: NextRequest, { params: { slug } }: { params: { slug: string } }) {
   const token = cookies().get("token");
   if (!token) throw new Error("You do not have the permissions to delete this listing");

   const res = await fetch(`${API_URL}/listings/${slug}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token.value}` },
   });

   if (!res.ok) throw new Error(`failed to delete listing with slug "${slug}": ${res.statusText}`);

   const data = (await res.json()) as { message: string };

   return Response.json(data);
}
