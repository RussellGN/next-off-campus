import { getListingAction } from "@/actions";
import DetailedView from "@/components/accomodation/DetailedView";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
   const { listing, related_listings } = await getListingAction(slug);

   return <DetailedView listing={listing} related_listings={related_listings} />;
}
