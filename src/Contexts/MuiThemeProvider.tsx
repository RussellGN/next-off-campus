import React, { PropsWithChildren } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

const MuiThemeProvider = ({ children }: PropsWithChildren) => {
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         {children}
      </ThemeProvider>
   );
};

export default MuiThemeProvider;
