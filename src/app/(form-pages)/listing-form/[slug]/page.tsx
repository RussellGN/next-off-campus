import { getListingAction } from "@/actions";
import ListingForm from "@/components/listing-form/ListingForm";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
   const { listing } = await getListingAction(slug);

   return <ListingForm listing={listing} />;
}
