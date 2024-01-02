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
