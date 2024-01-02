"use client";

import React, {
   useState,
   useRef,
   useEffect,
   ReactNode,
   RefObject,
} from "react";

type propTypes = {
   children: ReactNode;
   ratio?: "16/9" | string;
};

export default function AspectRatioContainer({
   children,
   ratio = "16/9",
}: propTypes) {
   const [height, setHeight] = useState("fit-content");
   const itemRef = useRef();

   useEffect(() => {
      function handleResize() {
         let numberRatio: number;
         try {
            numberRatio =
               parseInt(ratio.split("/")[1]) / parseInt(ratio.split("/")[0]);
         } catch (error) {
            numberRatio = 9 / 16;
         }

         const width = itemRef.current.clientWidth;
         setHeight(`${width * numberRatio}px`);
      }

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, [ratio]);

   return (
      <div ref={itemRef} style={{ width: "100%", height: height }}>
         {children}
      </div>
   );
}
