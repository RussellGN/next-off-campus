import { ListerInterface, SimpleListingInterface } from "@/interfaces";

export const heroListings: SimpleListingInterface[] = [
   {
      id: 17,
      title: "Rooms for two",
      slug: "rooms-for-two-17",
      rent: 150,
      location: "Mount pleasant",
      lister: <ListerInterface>{
         id: 58,
         email: "uzagents@uzagents.co.zw",
         username: "UZ agents",
         lister_type: "agent",
         contact_details: "call +263 7788 9977",
      },
      coverImage: "/listing-images/bh1.jpg",
   },

   {
      id: 16,
      title: "Cosy apartment",
      slug: "cosy-apartment-16",
      rent: 250,
      location: "Belgravia",
      lister: <ListerInterface>{
         id: 99,
         email: "aaproperties@aaproperties.com",
         username: "AA properties",
         lister_type: "agent",
         contact_details: "call +263 7788 9977",
      },
      coverImage: "/listing-images/bh4.jpg",
   },

   {
      id: 64,
      title: "Girls' boarding",
      slug: "girls-boarding-64",
      rent: 100,
      location: "Belvedere",
      lister: <ListerInterface>{
         id: 78,
         email: "ammyk@gmail.com",
         username: "AmmyK",
         lister_type: "landlord",
         contact_details: "call +263 7788 9977",
      },
      coverImage: "/listing-images/bh3.jpg",
   },
];
