import { Home } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
   return (
      <div
         style={{ minHeight: "60vh" }}
         className="flex text-center gap-2 items-center justify-center flex-col"
      >
         <Typography variant="h6">This route does not exist</Typography>
         <Button startIcon={<Home />} component={Link} href="/">
            Home
         </Button>
      </div>
   );
}
