import { memo } from "react";
import { AspectContainedImage } from "../AspectRatioContainer";
import AspectContainedNextImage from "../AspectContainedNextImage";

export default memo(
   function PreviewImages({ images }: { images: File[] }) {
      return (
         <>
            {images.map((img, index) => {
               const imgUrl = URL.createObjectURL(img);

               return (
                  <AspectContainedNextImage
                     key={"img-" + index}
                     src={imgUrl}
                     alt="preview image"
                     sx={{ borderRadius: "5px" }}
                  />
               );
            })}
         </>
      );
   },
   (prevProps, nextProps) => prevProps.images === nextProps.images
);
