"use client";

import { ArrowUpward, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, Container, IconButton, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import useLister from "@/hooks/useLister";

export default function Footer() {
   const { lister, isPending } = useLister();

   return (
      <Container>
         <Box
            component="footer"
            sx={{
               my: 3,
               borderTop: "solid",
               borderColor: "divider",
               p: { xs: 2, sm: 4 },
            }}
         >
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
               {isPending || lister ? (
                  ""
               ) : (
                  <MuiLink
                     underline="none"
                     component={Link}
                     href="/auth/login"
                     sx={{ "&:hover": { color: "primary.main" } }}
                  >
                     <KeyboardDoubleArrowRight sx={{ mr: 0.4 }} />
                     Login
                  </MuiLink>
               )}
               <MuiLink
                  underline="none"
                  component={Link}
                  href="/advertise"
                  sx={{ "&:hover": { color: "primary.main" } }}
               >
                  <KeyboardDoubleArrowRight sx={{ mr: 0.4 }} />
                  Advertise
               </MuiLink>
            </Box>

            <Box
               sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <Typography variant="body2">
                  All Rights Reserved.
                  {/* Developed By
					<MuiLink
						underline="none"
						component="a"
						target="_blank"
						href="https://websolutionsharare.github.io/frontdesk"
						sx={{ px: 0.5, "&:hover": { color: "primary.main" } }}
					>
						Web Solutions Harare
					</MuiLink> */}
               </Typography>
               <IconButton title="Back to top" size="small" onClick={() => window.scrollTo(0, 0)}>
                  <ArrowUpward />
               </IconButton>
            </Box>
         </Box>
      </Container>
   );
}
