"use client";

import { Box, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export const FormsBackground = ({ children }: PropsWithChildren) => {
   const theme = useTheme();
   return (
      <Box
         sx={{
            background: `linear-gradient(to top right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            py: 4,
         }}
      >
         {children}
      </Box>
   );
};
