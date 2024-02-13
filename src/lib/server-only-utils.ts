import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function notAuthenticatedServer() {
   const token = cookies().get("token");
   if (token) {
      console.log("already logged in, re-routing...");
      redirect("/profile");
   }
}

export function onlyAuthenticatedServer() {
   const token = cookies().get("token");
   if (!token) {
      console.log("login required, re-routing...");
      redirect("/auth/login");
   }
}
