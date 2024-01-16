import { CheckboxOrRadioFilterInterface } from "@/interfaces";
import { link } from "@/types";

export const navLinks: link[] = [
   {
      label: "Home",
      path: "/",
   },
   {
      label: "Accomodation",
      path: "/accomodation",
   },
   {
      label: "About",
      path: "/about",
   },
   {
      label: "Contact",
      path: "/contact",
   },
];

export const zIndices = {
   header: 99,
   mobileSidebar: 100,
};

export const radioCheckFilters: CheckboxOrRadioFilterInterface[] = [
   {
      label: "Acomodation type",
      name: "type",
      inputType: "checkbox",
      options: [
         { label: "House", value: "house" },
         { label: "Apartment", value: "apartment" },
         { label: "Boarding house", value: "boarding" },
         { label: "Cottage", value: "cottage" },
         { label: "Room", value: "room" },
         { label: "Other", value: "other" },
      ],
      default: null,
   },
   {
      label: "Rent",
      name: "rent",
      inputType: "radio",
      options: [
         { label: "$0-100", value: "0-100" },
         { label: "$100-200", value: "100-200" },
         { label: "$200-300", value: "200-300" },
         { label: "$400+", value: "400+" },
      ],
      default: null,
   },
   {
      label: "City",
      name: "city",
      inputType: "radio",
      options: [
         { label: "Harare", value: "harare" },
         { label: "Bulawayo", value: "bulawayo" },
         { label: "Vic Falls", value: "vic-falls" },
         { label: "Masvingo", value: "masvingo" },
      ],
      default: null,
   },
];
