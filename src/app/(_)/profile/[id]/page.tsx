"use client";

import { Add, ContactPage, Edit, Email, Logout, Person } from "@mui/icons-material";
import {
   Avatar,
   Box,
   Button,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Grid,
   IconButton,
   Typography,
} from "@mui/material";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Listings from "@/components/accomodation/Listings";
import { ListerInterface } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function Page({ params: { id } }: { params: { id: number } }) {
   const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
   const router = useRouter();

   function logout() {
      console.log("logging out");
      router.push("/");
   }

   function confirmLogout() {
      hideLogoutDialog();
      logout();
   }
   const showLogoutDialog = () => setOpenLogoutDialog(true);
   const hideLogoutDialog = () => setOpenLogoutDialog(false);

   const lister = fetchLister(id);

   useEffect(() => {
      if (!lister) {
         alert("You're not logged in!");
         router.push("/");
      }
   }, [lister]);

   if (lister)
      return (
         <div className="mt-7">
            <LogoutDialog {...{ openLogoutDialog, hideLogoutDialog, confirmLogout }} />

            <Grid container gap={3}>
               <Grid item xs={12} md={3}>
                  <Box
                     sx={{
                        borderRadius: "15px",
                        boxShadow: "1px 1px 4px gray",
                        position: { md: "sticky" },
                        p: 3,
                        top: "100px",
                        py: { md: 8 },
                     }}
                  >
                     <Box
                        sx={{
                           mb: 2,
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                        }}
                     >
                        <Avatar
                           alt={lister.username}
                           sx={{
                              boxShadow: "1px 1px 4px black",
                              color: "white",
                           }}
                        >
                           {generateAvatarLetters(lister.username)}
                        </Avatar>

                        <IconButton
                           title="Edit Details"
                           component={Link}
                           href={"/auth/edit-details/" + lister.id}
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
                              width: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                           }}
                        >
                           <Person fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
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
                           <Email fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
                           {lister.email}
                        </Typography>

                        <Typography
                           sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 0.5,
                           }}
                        >
                           <ContactPage fontSize="small" />
                           <span>{lister.contactDetails}</span>
                        </Typography>
                     </Box>
                  </Box>
               </Grid>

               <Grid item xs={12} md>
                  <div>
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 1,
                           mb: 3,
                           p: 3,
                           borderRadius: "15px",
                           boxShadow: "1px 1px 4px grey",
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
                     </Box>

                     <Box sx={{ p: 2, minHeight: "40vh" }}>
                        <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
                           Your listings
                        </Typography>

                        <Suspense
                           fallback={
                              <Box
                                 sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                    pt: 10,
                                    width: "100%",
                                    height: "80vh",
                                 }}
                              >
                                 <CircularProgress />
                              </Box>
                           }
                        >
                           <Listings />
                        </Suspense>
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
            <Button size="small" onClick={hideLogoutDialog}>
               Cancel
            </Button>
            <Button size="small" onClick={confirmLogout} autoFocus>
               Yes
            </Button>
         </DialogActions>
      </Dialog>
   );
}

function fetchLister(id: number): ListerInterface {
   const dummyLister: ListerInterface = {
      id,
      username: "UZOCA",
      email: "info@uzoca.com",
      contactDetails: "Call +263 7756 8321 or Whatsapp us on +263 8399 7342",
      listerType: "agent",
   };

   return dummyLister;
}

function generateAvatarLetters(string: string): string {
   string = string.trim();
   let words = string.split(" ");
   let letters = words.map((word) => word[0]);

   return letters.join("").toUpperCase();
}
