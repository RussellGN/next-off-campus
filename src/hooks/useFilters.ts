import { radioCheckFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useFilters() {
   const params = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formDataObject: any = {}; // type of 'any' just to shut the compiler up

      for (const entry of formData.entries()) {
         const [name, value] = entry;

         if (formDataObject[name]) {
            formDataObject[name] += "," + value;
         } else formDataObject[name] = value;
      }

      const searchParams = new URLSearchParams(params);
      let oldFilters = radioCheckFilters.map((filter) => filter.name); // create a list of old filters

      Object.keys(formDataObject).forEach((name) => {
         const value = formDataObject[name];
         if (value) searchParams.set(name, value);
         else searchParams.delete(name);

         oldFilters = oldFilters.filter((filter) => filter !== name); // remove this filter since its been encountered
      });
      oldFilters.forEach((filter) => searchParams.delete(filter)); // delete old filters not encountered
      router.replace(pathname + "?" + searchParams.toString());
   }

   function resetFilters() {
      const searchParams = new URLSearchParams(params);
      radioCheckFilters.forEach(({ name }) => searchParams.delete(name));
      router.replace(pathname + searchParams.toString() ? `?${searchParams.toString()}` : "");
   }

   // on inital page load, clear all filters from the url
   useEffect(() => {
      const searchParams = new URLSearchParams(params);
      radioCheckFilters.forEach(({ name }) => searchParams.delete(name));
      router.replace(pathname + searchParams.toString() ? `?${searchParams.toString()}` : "");
   }, []);

   return {
      params,
      handleSubmission,
      resetFilters,
   };
}
