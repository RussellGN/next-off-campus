import { fetchTags } from "@/constants";
import { ListingInterface } from "@/interfaces";

const baseURL = "http://127.0.0.1:8000";
const apiURL = baseURL + "/api";

export async function getListings() {
   const res = await fetch(`${apiURL}/listings/`, { next: { tags: [fetchTags.listings] } });

   if (!res.ok) throw new Error(`failed to fetch listings: ${res.statusText}`);

   const data = (await res.json()) as { listings: ListingInterface[] };
   data.listings.forEach((listing) =>
      listing.images.forEach((img) => (img.image = baseURL + img.image))
   );

   return data.listings;
}

export async function getListing(slug: string) {
   const res = await fetch(`${apiURL}/listings/${slug}/`, {
      cache: "no-store",
      next: { tags: [fetchTags.detailedListing] },
   });

   if (!res.ok) throw new Error(`failed to fetch listing ${slug}: ${res.statusText}`);

   const data = (await res.json()) as {
      listing: ListingInterface;
      related_listings: ListingInterface[];
   };
   console.log(data);
   data.listing.images.forEach((img) => (img.image = baseURL + img.image));
   data.related_listings.forEach((listing) =>
      listing.images.forEach((img) => (img.image = baseURL + img.image))
   );

   return data;
}
