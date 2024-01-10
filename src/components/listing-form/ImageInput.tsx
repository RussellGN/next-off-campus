"use client";

import { AddPhotoAlternate, DeleteOutlined } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useRef, memo } from "react";
import AspectRatioContainer from "@/components/AspectRatioContainer";

export default memo(
   function ImageInput({ image, imageNumber }: { image?: string; imageNumber: number }) {
      const theme = useTheme();
      const inputRef = useRef<HTMLInputElement>(null);
      const isImageSelected = Boolean(image);
      const imageURL = isImageSelected ? URL.createObjectURL(imageContainer[0]) : "";

      function onClick() {
         if (isImageSelected) {
            dispatch({ type: "images-changed", options: { key: imageKey, value: null } });
            inputRef.current.value = "";
         } else {
            inputRef.current.click();
         }
      }

      function onChange(e: any) {
         if (e.target.files.length) {
            dispatch({
               type: "images-changed",
               options: { key: imageKey, value: [e.target.files[0]] },
            });
         } else {
            console.log("no image selected");
         }
      }

      return (
         <AspectRatioContainer>
            <Box
               onClick={onClick}
               sx={{
                  width: "100%",
                  height: "100%",
                  border: "solid thin",
                  borderColor: "divider",
                  borderRadius: "5px",
                  background: `url(${imageURL}), ${theme.palette.divider}`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  cursor: "pointer",
                  position: "relative",
               }}
            >
               <IconButton
                  title={isImageSelected ? "Remove photo" : "Add photo"}
                  sx={{
                     borderRadius: 0,
                     position: "absolute",
                     top: 0,
                     left: 0,
                     width: "100%",
                     height: "100%",
                  }}
               >
                  {isImageSelected ? <DeleteOutlined /> : <AddPhotoAlternate />}
               </IconButton>
            </Box>

            <input
               ref={inputRef}
               value=""
               onChange={onChange}
               type="file"
               accept="image/*"
               style={{ display: "none" }}
            />
         </AspectRatioContainer>
      );
   },
   (prevProps, nextProps) => prevProps.imageContainer === nextProps.imageContainer
);
