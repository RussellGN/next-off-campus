import { ListingInterface } from "@/interfaces";
import { NextRequest } from "next/server";
import { API_URL } from "@/constants";

export async function GET(request: NextRequest) {
   const queryString = request.nextUrl.searchParams.toString();
   const res = await fetch(`${API_URL}/listings?${queryString}`);

   if (!res.ok) throw new Error(`failed to fetch listings, search params were "${queryString}": ${res.statusText}`);

   const data = (await res.json()) as {
      listings: ListingInterface[];
      page_count: number;
   };

   return Response.json(data);
}
