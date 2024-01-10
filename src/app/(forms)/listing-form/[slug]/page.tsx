import ListingForm from "@/components/listing-form/ListingForm";
import { getListing } from "@/lib/dataFetching";

export default function Page({ params: { slug } }: { params: { slug: string } }) {
   const listing = getListing(slug);

   return <ListingForm listing={listing} />;
}
