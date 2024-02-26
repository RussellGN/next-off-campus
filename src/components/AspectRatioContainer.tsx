"use client";

import { Box, SxProps } from "@mui/material";
import Image from "next/image";
import React, { useState, useRef, useEffect, ReactNode } from "react";

type propTypes = {
   children: ReactNode;
   ratio?: string;
   containerStyles?: SxProps;
};

export default function AspectRatioContainer({ children, containerStyles, ratio = "16/9" }: propTypes) {
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
      <Box ref={itemRef} sx={{ width: "100%", height: height, ...containerStyles }}>
         {children}
      </Box>
   );
}

export function AspectContainedImage({
   ratio,
   src,
   alt,
   style,
   containerStyles,
   children,
}: {
   ratio?: "string";
   src: string;
   alt: string;
   style?: object;
   containerStyles?: SxProps;
   children?: ReactNode;
}) {
   return (
      <AspectRatioContainer ratio={ratio} containerStyles={containerStyles}>
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
         {children}
      </AspectRatioContainer>
   );
}
