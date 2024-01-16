"use client";

import { ListingInterface } from "@/interfaces";
import { Box, Button, Grid } from "@mui/material";
import { useTheme, Typography } from "@mui/material";
import {
   PlaceOutlined,
   DirectionsWalk,
   MonetizationOn,
   KeyboardArrowLeft,
   KeyboardArrowRight,
   ArrowBack,
   Person,
   PersonOutlined,
   ContactMail,
   ContactMailOutlined,
} from "@mui/icons-material";
import AspectRatioContainer, { AspectContainedImage } from "@/components/AspectRatioContainer";
import { useState } from "react";
import { styled } from "@mui/system";
import RelatedListings from "@/components/accomodation/RelatedListings";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { capitalize } from "@/lib/utils";
import { getListing } from "@/lib/dataFetching";

export default function Page({ params: { slug } }: { params: { slug: string } }) {
   const [imageOnView, setImageOnView] = useState(0);
   const theme = useTheme();
   const router = useRouter();

   const listing: ListingInterface | undefined = getListing(slug);

   if (listing)
      return (
         <>
            <div className="w-full my-7">
               <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => router.back()}>
                  Back
               </Button>
            </div>

            <Grid container>
               <Grid item xs={12} md={6}>
                  <div>
                     <Box sx={{ position: "relative" }}>
                        <Box
                           sx={{
                              position: "absolute",
                              top: "50%",
                              left: "0",
                              transform: "translateY(-50%)",
                              width: "100%",
                              height: "fit-content",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              p: 1,
                           }}
                        >
                           <StyledButton
                              onClick={() =>
                                 setImageOnView((prev) =>
                                    prev === 0 ? listing.images.length - 1 : prev - 1
                                 )
                              }
                           >
                              <KeyboardArrowLeft />
                           </StyledButton>
                           <StyledButton
                              onClick={() =>
                                 setImageOnView((prev) =>
                                    prev === listing.images.length - 1 ? 0 : prev + 1
                                 )
                              }
                           >
                              <KeyboardArrowRight />
                           </StyledButton>
                        </Box>

                        <AspectContainedImage
                           src={listing.images[imageOnView].image}
                           alt={listing.title}
                           style={{
                              borderRadius: "10px",
                              border: "solid thin",
                              borderColor: theme.palette.divider,
                           }}
                        />
                     </Box>

                     <Box sx={{ display: "flex", gap: 0.4, py: 1, overflow: "auto" }}>
                        {listing.images.map((image, index) => (
                           <Box key={"img-" + image.id} sx={{ width: "20%", minWidth: "5rem" }}>
                              <AspectRatioContainer>
                                 <StyledImg
                                    onClick={() => setImageOnView(index)}
                                    src={image.image}
                                    alt={listing.title}
                                    width={160}
                                    height={90}
                                    style={{
                                       opacity: imageOnView === index ? "1" : "0.8",
                                       border: "solid thin",
                                       borderColor: theme.palette.divider,
                                    }}
                                 />
                              </AspectRatioContainer>
                           </Box>
                        ))}
                     </Box>
                  </div>
               </Grid>

               <Grid item xs={12} md>
                  <Box
                     sx={{
                        p: { xs: 1, sm: 3 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                     }}
                  >
                     <Grid
                        container
                        spacing={0}
                        gap={2}
                        alignItems="center"
                        justifyContent="space-between"
                     >
                        <Grid item xs zeroMinWidth>
                           <Typography variant="h6" noWrap>
                              {capitalize(listing.title)}
                           </Typography>
                        </Grid>
                        <Grid item xs="auto">
                           <Typography variant="caption" color="primary">
                              {listing.date}
                           </Typography>
                        </Grid>
                     </Grid>

                     <div>
                        <Typography sx={{ mb: 1.5 }}>
                           <PlaceOutlined fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
                           {listing.location}
                        </Typography>

                        <Typography sx={{ mb: 1.5 }}>
                           <DirectionsWalk fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
                           {`${listing.distance} km to ${listing.nearest_to}`}
                        </Typography>

                        <Typography sx={{ mb: 1.5 }}>
                           <MonetizationOn fontSize="small" sx={{ mr: 0.8, mt: -0.2 }} />
                           {`${listing.rent} per month`}
                        </Typography>

                        <Typography
                           sx={{
                              mb: 1.5,
                              border: "solid 1px",
                              borderColor: "divider",
                              backgroundColor: "background.paper",
                              p: 1.5,
                              borderRadius: "5px",
                           }}
                        >
                           {listing.description}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1.5, gap: 1 }}>
                           <Typography
                              sx={{
                                 border: "solid 1px",
                                 borderColor: "divider",
                                 minWidth: "30%",
                                 backgroundColor: "background.paper",
                                 p: 1,
                                 borderRadius: "5px",
                                 display: "flex",
                                 gap: 0.8,
                              }}
                           >
                              <PersonOutlined fontSize="small" />
                              {listing.lister.username}
                           </Typography>

                           <Typography
                              sx={{
                                 border: "solid 1px",
                                 borderColor: "divider",
                                 backgroundColor: "background.paper",
                                 p: 1,
                                 borderRadius: "5px",
                                 display: "flex",
                                 gap: 0.8,
                              }}
                           >
                              <ContactMailOutlined fontSize="small" />
                              {listing.lister.contact_details}
                           </Typography>
                        </Box>
                     </div>
                  </Box>
               </Grid>
            </Grid>

            <RelatedListings />
         </>
      );
}

const StyledButton = styled("button")({
   borderRadius: "100%",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   padding: "0.5rem",
   border: "0",
   color: "white",
   backgroundColor: "rgba(0,0,0,0.3)",
   transition: "all 0.2s ease-in-out",
   "&:hover": {
      backgroundColor: "rgba(0,0,0,0.5)",
   },
});

const StyledImg = styled(Image)({
   width: "100%",
   height: "100%",
   objectFit: "cover",
   transition: "all 0.05s",
   borderRadius: "8px",
   cursor: "pointer",
   "&:hover": {
      opacity: "1 !important",
   },
});
