import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import LoadingContent from "./LoadingContent";
import ErrorContent from "./ErrorContent";
import { Button, Typography } from "@mui/material";
import { capitalize } from "@/lib/utils";
import { HomeOutlined } from "@mui/icons-material";

export default function AuthForm({
   submitting,
   errorMessage,
   children,
   title,
   handleSubmit,
}: {
   submitting: boolean;
   errorMessage: string;
   children: ReactNode;
   title: string;
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
   const router = useRouter();

   function goHome() {
      router.push("/");
   }

   if (errorMessage) return <ErrorContent errorMessage={errorMessage} />;
   if (submitting) return <LoadingContent />;

   return (
      <form
         onSubmit={handleSubmit}
         className="flex flex-col justify-center items-center gap-6 w-full"
         // key={title + "-form"}
      >
         <div className="w-full">
            <Button variant="outlined" startIcon={<HomeOutlined />} onClick={goHome}>
               Home
            </Button>
         </div>
         <Typography variant="h6" textAlign="center">
            {capitalize(title)}
         </Typography>
         {children}
      </form>
   );
}
