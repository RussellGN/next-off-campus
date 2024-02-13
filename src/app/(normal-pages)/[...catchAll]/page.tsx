import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Page() {
   return (
      <div className="flex justify-center items-center h-[70vh] text-center">
         <p>
            This route does not exist
            <br />
            <Button component={Link} href="/" startIcon={<Home />} sx={{ mt: 2 }}>
               Home
            </Button>
         </p>
      </div>
   );
}
