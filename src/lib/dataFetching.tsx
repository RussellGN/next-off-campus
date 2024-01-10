import { listings } from "@/data/listings";
import { ListerInterface, ListingInterface } from "@/interfaces";

export function getListing(slug: string): ListingInterface | undefined {
   const dummyListing = listings.find((listing) => listing.slug === slug);
   return dummyListing;
}

export function getLister(id: number): ListerInterface {
   const dummyLister: ListerInterface = {
      id,
      username: "UZOCA",
      email: "info@uzoca.com",
      contactDetails: "Call +263 7756 8321 or Whatsapp us on +263 8399 7342",
      listerType: "agent",
   };

   return dummyLister;
}
