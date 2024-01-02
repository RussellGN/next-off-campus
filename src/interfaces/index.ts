export interface ListerInterface {
   id: number | string;
   username: string;
   email: string;
   listerType: "agent" | "landlord";
}

export interface ListingInterface {
   id: number | string;
   title: string;
   slug: string;
   rent: number;
   location: string;
   nearestTo: string;
   patentsNeeded: number;
   distance: number;
   accomodationType: "boarding-house" | "house" | "cottage" | "apartment" | "other";
   description: string;
   date: string;
   lister: ListerInterface;
   images: string[];
}

export interface SimpleListingInterface {
   id: number | string;
   title: string;
   slug: string;
   rent: number;
   location: string;
   lister: ListerInterface;
   coverImage: string;
}