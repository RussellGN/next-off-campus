import ListingForm from "@/components/listing-form/ListingForm";
import { getListing } from "@/lib/API_V2";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
   const { listing } = await getListing(slug);

   return <ListingForm listing={listing} />;
}
