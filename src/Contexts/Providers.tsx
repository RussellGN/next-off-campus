import { PropsWithChildren } from "react";
import MuiThemeProvider from "./MuiThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const Providers = ({ children }: PropsWithChildren) => {
   return (
      <AppRouterCacheProvider>
         <MuiThemeProvider children={children} />
      </AppRouterCacheProvider>
   );
};

export default Providers;
