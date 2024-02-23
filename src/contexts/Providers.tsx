import { PropsWithChildren } from "react";
import MuiThemeProvider from "./MuiThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ReactQueryProvider from "./ReactQueryProvider";
// import AlertsProvider from "./AlertsProvider";

export default function Providers({ children }: PropsWithChildren) {
   return (
      // <AlertsProvider>
      <ReactQueryProvider>
         <AppRouterCacheProvider>
            <MuiThemeProvider>{children}</MuiThemeProvider>
         </AppRouterCacheProvider>
      </ReactQueryProvider>
      // </AlertsProvider>
   );
}
