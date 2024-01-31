import DetailedView from "@/components/accomodation/DetailedView";
import { getListing } from "@/lib/API_V2";

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
   const { listing, related_listings } = await getListing(slug);

   return <DetailedView listing={listing} related_listings={related_listings} />;
}
