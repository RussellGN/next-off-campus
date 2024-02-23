import axios from "axios";
import { redirect } from "next/navigation";

export function capitalize(text: string): string {
   let finalText = "";
   let words = text.split(" ");
   words = words.filter((word) => word !== " ");

   words.forEach((word) => {
      let newWord = word.trim();
      let firstLetter = newWord[0].toUpperCase();
      finalText += firstLetter + newWord.substring(1) + " ";
   });

   return finalText.trim();
}

export function generateAvatarLetters(string: string): string {
   string = string.trim();
   let words = string.split(" ");
   let letters = words.map((word) => word[0]);

   const finalLetters = letters.join("").toUpperCase();

   if (finalLetters.length > 1) return finalLetters.slice(0, 2);
   else return finalLetters;
}

export async function wait(seconds: number, log?: boolean) {
   if (log) console.log("waiting");
   await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
   if (log) console.log("done waiting");
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
   try {
      let d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
   } catch (error) {
      console.log("error getting cookie:", error);
   }
}

export function deleteCookie(cname: string) {
   try {
      document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
   } catch (error) {
      console.log("error deleting cookie:", error);
   }
}

export function getCookie(cname: string) {
   try {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
         let c = ca[i];
         while (c.charAt(0) == " ") {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
      }
      return null;
   } catch (error) {
      console.log("error getting cookie:", error);
      return null;
   }
}

export function notAuthenticated() {
   const token = getCookie("token");
   if (token) {
      console.log("already logged in, re-routing...");
      redirect("/profile");
   }
}

export function onlyAuthenticated() {
   const token = getCookie("token");
   if (!token) {
      console.log("login required, re-routing...");
      redirect("/auth/login");
   }
}
