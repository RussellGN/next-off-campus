import { CircularProgress } from "@mui/material";

export default function Loading() {
   return (
      <div className="flex justify-center items-center h-[70vh] text-center">
         <CircularProgress />
      </div>
   );
}
