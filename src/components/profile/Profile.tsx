"use client";

import { Add, Edit, KeyboardDoubleArrowRight, Logout } from "@mui/icons-material";
import {
   Avatar,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Grid,
   IconButton,
   Paper,
   Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import Listings from "@/components/accomodation/Listings";
import { useRouter } from "next/navigation";
import ListerAvatarOrSignup from "@/components/layout/ListerAvatarOrSignup";
import { ListerInterface, ListingInterface } from "@/interfaces";
import { deleteCookie, generateAvatarLetters } from "@/lib/utils";

export default function Profile({
   lister,
   lister_listings,
}: {
   lister: ListerInterface;
   lister_listings: ListingInterface[];
}) {
   const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
   const router = useRouter();

   async function logout() {
      console.log("logging out");
      deleteCookie("token");
      router.push("/");
   }

   function confirmLogout() {
      hideLogoutDialog();
      logout();
   }

   const showLogoutDialog = () => setOpenLogoutDialog(true);
   const hideLogoutDialog = () => setOpenLogoutDialog(false);

   return (
      <div className="mt-7">
         <LogoutDialog {...{ openLogoutDialog, hideLogoutDialog, confirmLogout }} />

         <Grid container gap={3}>
            <Grid item xs={12} md={3}>
               <Paper
                  sx={{
                     borderRadius: "15px",
                     position: { md: "sticky" },
                     p: 3,
                     top: "100px",
                     py: { md: 8 },
                  }}
               >
                  <Box
                     sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
                  >
                     <Avatar
                        alt={lister.username}
                        sx={{
                           border: "solid 1px",
                           borderColor: "divider",
                           color: "white",
                        }}
                     >
                        {generateAvatarLetters(lister.username)}
                     </Avatar>

                     <IconButton
                        title="Edit Details"
                        component={Link}
                        href="/auth/edit-details/"
                        size="small"
                        sx={{ "&:hover": { color: "inherit" } }}
                     >
                        <Edit />
                     </IconButton>
                  </Box>

                  <Box>
                     <Typography
                        sx={{
                           mb: 1,
                           Width: "100%",
                           whiteSpace: "nowrap",
                           overflow: "hidden",
                           textOverflow: "ellipsis",
                        }}
                     >
                        {/* <Person fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} /> */}
                        <KeyboardDoubleArrowRight fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
                        {lister.username}
                     </Typography>

                     <Typography
                        sx={{
                           mb: 1,
                           width: "100%",
                           whiteSpace: "nowrap",
                           overflow: "hidden",
                           textOverflow: "ellipsis",
                        }}
                     >
                        {/* <Email fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} /> */}
                        <KeyboardDoubleArrowRight fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
                        {lister.email}
                     </Typography>

                     <Typography
                        sx={{
                           display: "flex",
                           alignItems: "flex-start",
                           gap: 0.5,
                        }}
                     >
                        {/* <ContactPage fontSize="small" /> */}
                        <KeyboardDoubleArrowRight fontSize="small" />
                        <span>{lister.contact_details}</span>
                     </Typography>
                  </Box>
               </Paper>
            </Grid>

            <Grid item xs={12} md>
               <div>
                  <Paper
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 3,
                        p: 3,
                        borderRadius: "15px",
                     }}
                  >
                     <Button
                        component={Link}
                        href="/listing-form"
                        startIcon={<Add />}
                        sx={{ mr: "auto", "&:hover": { color: "white" } }}
                     >
                        New Listing
                     </Button>
                     <IconButton title="Logout" onClick={showLogoutDialog} size="small">
                        <Logout />
                     </IconButton>
                  </Paper>

                  <Box sx={{ p: 2, minHeight: "40vh" }}>
                     {lister_listings.length ? (
                        <>
                           <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
                              Your listings
                           </Typography>
                           <Listings listerListings={lister_listings} />
                        </>
                     ) : (
                        <>
                           <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
                              Your listings will appear here. Lets create one!
                              <br />
                              <IconButton
                                 component={Link}
                                 href="/listing-form"
                                 sx={{
                                    border: "solid 1px",
                                    borderColor: "divider",
                                    mt: 2,
                                    mr: "auto",
                                    "&:hover": { color: "white" },
                                 }}
                              >
                                 <Add />
                              </IconButton>
                           </Typography>
                        </>
                     )}
                  </Box>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}

function LogoutDialog({
   openLogoutDialog,
   hideLogoutDialog,
   confirmLogout,
}: {
   openLogoutDialog: boolean;
   hideLogoutDialog: () => void;
   confirmLogout: () => void;
}) {
   return (
      <Dialog
         open={openLogoutDialog}
         onClose={hideLogoutDialog}
         aria-labelledby="logout-dialog-title"
         aria-describedby="logout-dialog-description"
         maxWidth="xs"
         sx={{ textAlign: "center" }}
      >
         <DialogTitle noWrap id="logout-dialog-title" sx={{ pt: 3 }}>
            Logout
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="logout-dialog-description">
               Are you sure you want to logout?
            </DialogContentText>
         </DialogContent>
         <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button onClick={hideLogoutDialog}>Cancel</Button>
            <Button variant="outlined" color="secondary" onClick={confirmLogout}>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   );
}
