export interface ListerInterface {
   id: number | string;
   username: string;
   email: string;
   lister_type: "agent" | "landlord";
   contact_details: string;
}

export interface ListingInterface {
   id: number | string;
   title: string;
   slug: string;
   rent: number;
   location: string;
   nearest_to: string;
   patents_needed: number;
   distance: number;
   accomodation_type: "boarding" | "house" | "cottage" | "apartment" | "other";
   description: string;
   date: string;
   lister: ListerInterface;
   images: { id: number; image: string }[];
   view_count: number;
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

export interface CheckboxOrRadioFilterInterface {
   name: string;
   label: string;
   inputType: "checkbox" | "radio";
   options: { label: string; value: string }[];
   default: string | null;
}
