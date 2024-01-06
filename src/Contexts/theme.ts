"use client";

import { createTheme } from "@mui/material";

// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//    subsets: ["latin"],
//    weight: ["300", "400", "500", "700"],
//    display: "swap",
// });

// const theme = createTheme({
//    typography: {
//       fontFamily: roboto.style.fontFamily,
//    },
// });

const theme = createTheme({
   palette: {
      primary: {
         light: "rgb(27, 68, 104)",
         main: "rgb(17, 46, 72)",
         dark: "rgb(3, 17, 29)",
      },
      secondary: {
         light: "rgb(255, 243, 217)",
         main: "rgb(255, 236, 193)",
         dark: "rgb(218, 180, 92)",
      },
   },
   components: {
      MuiButton: {
         defaultProps: {
            variant: "contained",
            size: "small",
            sx: { px: 2 },
         },
         styleOverrides: {
            root: {
               borderRadius: "20px",
               textTransform: "capitalize",
            },
         },
      },
      MuiTextField: {
         defaultProps: {
            sx: { "& .MuiInputBase-root": { borderRadius: "20px" } },
         },
      },
   },
});

export default theme;
