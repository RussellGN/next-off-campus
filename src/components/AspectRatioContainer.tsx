"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, ReactNode } from "react";

type propTypes = {
   children: ReactNode;
   ratio?: "16/9" | string;
};

export default function AspectRatioContainer({ children, ratio = "16/9" }: propTypes) {
   const [height, setHeight] = useState("fit-content");
   const itemRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      function handleResize() {
         if (itemRef.current !== null) {
            let numberRatio: number;
            try {
               numberRatio = parseInt(ratio.split("/")[1]) / parseInt(ratio.split("/")[0]);
            } catch (error) {
               numberRatio = 9 / 16;
            }

            const width = itemRef.current.clientWidth;
            setHeight(`${width * numberRatio}px`);
         }
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

export function AspectContainedImage({
   ratio,
   src,
   alt,
   style,
}: {
   ratio?: "string";
   src: string;
   alt: string;
   style?: object;
}) {
   return (
      <AspectRatioContainer ratio={ratio}>
         <Image
            priority
            src={src}
            quality={100}
            height={90}
            width={160}
            alt={alt}
            style={{
               width: "100%",
               height: "100%",
               objectFit: "cover",
               borderRadius: "15px 15px 0 0",
               ...style,
            }}
         />
      </AspectRatioContainer>
   );
}
