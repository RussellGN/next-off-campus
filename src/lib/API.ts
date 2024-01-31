import { ListerInterface, ListingInterface } from "@/interfaces";
import { getCookie, wait } from "./utils";
import axios, { AxiosResponse } from "axios";

const baseURL = "http://127.0.0.1:8000";

export const axiosClient = axios.create({
   baseURL: baseURL + "/api/",
});

export default class API {
   static async signup(formData: FormData) {
      interface SuccessReturnInterface {
         message: string;
         token: string;
         lister: ListerInterface;
      }

      const res = await axiosClient.post<SuccessReturnInterface>(`auth/signup/`, formData);

      return res.data;
   }

   static async login(email: string, password: string) {
      interface SuccessReturnInterface {
         message: string;
         token: string;
         lister: ListerInterface;
      }

      const res = await axiosClient.post<SuccessReturnInterface>(`auth/login/`, {
         email,
         password,
      });

      return res.data;
   }

   static async getLister() {
      interface SuccessReturnInterface {
         lister: ListerInterface;
      }

      const token = getCookie("token");
      if (!token) return null;

      const res = await axiosClient.get<SuccessReturnInterface>(`auth/`, {
         headers: { Authorization: `Token ${token}` },
      });

      return res.data.lister;
   }

   static async updateLister(formData: FormData) {
      interface SuccessReturnInterface {
         message: string;
         lister: ListerInterface;
      }

      const res = await axiosClient.patch<SuccessReturnInterface>(`auth/`, formData);

      return res.data;
   }

   static async getListings(queryParams: URLSearchParams) {
      interface SuccessReturnInterface {
         listings: ListingInterface[];
      }

      const res = await axiosClient.get<SuccessReturnInterface>("listings/", {
         params: queryParams,
      });
      const data = res.data;
      data.listings.forEach((listing) =>
         listing.images.forEach((img) => (img.image = baseURL + img.image))
      );
      return data.listings;
   }

   static async getListing(slug: string) {
      interface SuccessReturnInterface {
         listing: ListingInterface;
      }

      const res = await axiosClient.get<SuccessReturnInterface>(`listings/${slug}/`);
      const data = res.data;
      data.listing.images.forEach((img) => (img.image = baseURL + img.image));
      return data.listing;
   }

   static async createListing(formData: FormData) {
      interface SuccessReturnInterface {
         message: string;
         listing: ListingInterface;
      }
      const token = getCookie("token");
      const res = await axiosClient.post<SuccessReturnInterface>(`listings/`, formData, {
         headers: { Authorization: `Token ${token}` },
      });

      return res.data;
   }

   static async updateListing(slug: string, formData: FormData) {
      interface SuccessReturnInterface {
         message: string;
         listing: ListingInterface;
      }
      const token = getCookie("token");
      const res = await axiosClient.patch<SuccessReturnInterface>(`listings/${slug}/`, formData, {
         headers: { Authorization: `Token ${token}` },
      });

      return res.data;
   }

   static async deleteListing(slug: string) {
      interface SuccessReturnInterface {
         message: string;
      }
      const token = getCookie("token");
      const res = await axiosClient.delete<SuccessReturnInterface>(`listings/${slug}/`, {
         headers: { Authorization: `Token ${token}` },
      });

      return res.data;
   }
}
