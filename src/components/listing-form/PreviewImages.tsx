import { memo } from "react";
import { AspectContainedImage } from "../AspectRatioContainer";

export default memo(
   function PreviewImages({ images }: { images: File[] }) {
      return (
         <>
            {images.map((img, index) => {
               const imgUrl = URL.createObjectURL(img);

               return (
                  <AspectContainedImage
                     key={"img-" + index}
                     src={imgUrl}
                     alt="preview image"
                     style={{ borderRadius: "10px", border: "solid transparent" }}
                  />
               );
            })}
         </>
      );
   },
   (prevProps, nextProps) => prevProps.images === nextProps.images
);
