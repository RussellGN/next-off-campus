export interface ListerInterface {
   id: number | string;
   username: string;
   email: string;
   lister_type: "A" | "L";
   contact_details: string;
   listings?: ListingInterface[];
}

export interface ImageInterface {
   id: number;
   image: string;
}

export interface ListingInterface {
   id: number | string;
   title: string;
   slug: string;
   rent: number;
   location: string;
   nearest_to: string;
   distance: number;
   accomodation_type: "boarding" | "house" | "cottage" | "apartment" | "other";
   description: string;
   date: string;
   patents_needed: number;
   view_count: number;
   lister: ListerInterface;
   images: ImageInterface[];
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
