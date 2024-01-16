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
