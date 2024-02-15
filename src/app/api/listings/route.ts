import { ListingInterface } from "@/interfaces";
import { NextRequest } from "next/server";

const baseURL = "http://127.0.0.1:8000";
const apiURL = baseURL + "/api";

export async function GET(request: NextRequest) {
   const queryString = request.nextUrl.searchParams.toString();
   const res = await fetch(`${apiURL}/listings?${queryString}`, {});

   if (!res.ok) throw new Error(`failed to fetch listings, search params were "${queryString}": ${res.statusText}`);

   const data = (await res.json()) as {
      listings: ListingInterface[];
   };

   data.listings.forEach((listing) => listing.images.forEach((image) => (image.image = baseURL + image.image)));

   return Response.json(data);
}
