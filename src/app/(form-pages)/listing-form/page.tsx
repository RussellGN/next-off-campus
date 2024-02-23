"use client";

import {
   Box,
   Button,
   CircularProgress,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography,
} from "@mui/material";
import { ArrowBack, CheckCircle, InfoOutlined, KeyboardArrowRight, WarningAmberRounded } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { capitalize, wait } from "@/lib/utils";
import PreviewImages from "@/components/listing-form/PreviewImages";
import { accomodationTypes, defaultAccomodationType } from "@/constants";
import Link from "next/link";
import { createListingAction } from "@/actions";
import { ListingInterface } from "@/interfaces";

const tabs = {
   images: "images",
   info: "info",
   info2: "further-info",
   submitting: "submitting",
   success: "success",
};

export default function Page() {
   const [activeTab, setActiveTab] = useState(tabs.images);
   const [housingType, setHousingType] = useState(defaultAccomodationType);
   const [images, setImages] = useState<File[]>([]); // syncs with image file input in order to display image previews
   const [warningVisible, setWarningVisible] = useState(false);
   const responseRef = useRef<{ message: string; listing: ListingInterface } | null>(null);

   async function showWarning() {
      await wait(1);
      setWarningVisible(true);
   }

   function onImageInputChange(e: ChangeEvent<HTMLInputElement>) {
      if (e.target.files) {
         if (e.target.files.length < 3 || e.target.files.length > 30) {
            alert("Please select 3-30 images");
            e.target.value = "";
         }
      }
      setImages(e.currentTarget.files?.length ? Array.from(e.currentTarget.files) : []);
   }

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setActiveTab(tabs.submitting);

      const formData = new FormData(e.currentTarget);
      const res = await createListingAction(formData);
      console.log(res);
      responseRef.current = res;
      setActiveTab(tabs.success);
   }

   function nextTab() {
      switch (activeTab) {
         case tabs.images:
            setActiveTab(tabs.info);
            break;
         case tabs.info:
            setActiveTab(tabs.info2);
            break;
         default:
            setActiveTab(tabs.images);
      }
   }

   function prevTab() {
      switch (activeTab) {
         case tabs.info:
            setActiveTab(tabs.images);
            break;
         case tabs.info2:
            setActiveTab(tabs.info);
            break;
         default:
            setActiveTab(tabs.images);
      }
   }

   const isLastTab = activeTab === tabs.info2;

   if (activeTab === tabs.submitting) return <CircularProgress />;

   if (activeTab === tabs.success) {
      return (
         <>
            <div className="w-full mb-24">
               <Button component={Link} href="/profile" variant="outlined" startIcon={<ArrowBack />}>
                  Profile
               </Button>
            </div>

            <CheckCircle fontSize="large" color="primary" />
            <Typography paragraph textAlign="center">
               {responseRef.current?.message}
            </Typography>
            <Button
               component={Link}
               href={`/accomodation/${responseRef.current?.listing.slug}`}
               endIcon={<KeyboardArrowRight />}
            >
               View
            </Button>
         </>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full min-h-[80vh]">
         <div className="w-full">
            <Button component={Link} href="/profile" variant="outlined" startIcon={<ArrowBack />}>
               Profile
            </Button>
         </div>

         <Typography variant="h6" textAlign="center">
            New Listing
         </Typography>

         <Typography variant="body2">{capitalize(activeTab)}</Typography>

         <div className={activeTab === tabs.images ? "flex flex-col items-center gap-4 w-full" : "hidden"}>
            <Typography paragraph textAlign="center">
               <InfoOutlined fontSize="small" sx={{ mt: -0.5 }} /> First, upload images! The first image will be used as the
               cover image.
            </Typography>

            <input
               name="images"
               type="file"
               multiple
               accept="image/png,image/jpg,image/jpeg"
               onChange={onImageInputChange}
               required
            />

            <Box
               sx={{
                  height: "15rem",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gridTemplateRows: "max-content",
                  flexGrow: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  backgroundColor: "divider",
                  borderRadius: "10px",
                  p: 0.8,
                  position: "relative",
                  gap: 0.5,
               }}
            >
               {images.length ? (
                  <PreviewImages images={images} />
               ) : (
                  <p className="col-span-3 p-4 text-center">Images will preview here once selected</p>
               )}
            </Box>
         </div>

         <div className={activeTab === tabs.info ? "flex flex-col items-center gap-4 w-full" : "hidden"}>
            <Typography paragraph textAlign="center">
               <InfoOutlined fontSize="small" sx={{ mt: -0.5 }} /> Provide the following details.
            </Typography>

            <TextField
               size="small"
               label="Title, 5-30 chars"
               name="title"
               placeholder="e.g Comfy apartment"
               inputProps={{ minLength: 5, maxLength: 30 }}
               required
               fullWidth
            />

            <TextField
               size="small"
               label="Rent - USD/month, min-10, max-10 000"
               name="rent"
               type="number"
               inputProps={{ min: 10, max: 10000 }}
               required
               fullWidth
            />

            <TextField
               size="small"
               label="Location - City & Suburb, 5-40 chars"
               name="location"
               placeholder="e.g Harare, Belgravia"
               inputProps={{ minLength: 5, maxLength: 40 }}
               required
               fullWidth
            />

            <TextField
               size="small"
               label="Nearest Institution, 2-40 chars"
               name="nearest_to"
               placeholder="e.g University of Zimbabwe"
               inputProps={{ minLength: 2, maxLength: 40 }}
               required
               fullWidth
            />

            <FormControl size="small" fullWidth>
               <InputLabel id="accomodation-type-label">Type of Accomodation</InputLabel>
               <Select
                  labelId="accomodation-type-label"
                  id="accomodation-type"
                  label="Type of Accomodation"
                  name="accomodation_type"
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value)}
                  fullWidth
                  sx={{ borderRadius: "20px" }}
               >
                  {accomodationTypes.map((item) => (
                     <MenuItem key={item.value} value={item.value}>
                        {item.label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <TextField
               size="small"
               label="Walking Distance - km, min-0, max-30"
               name="distance"
               type="number"
               inputProps={{ min: 0, max: 30 }}
               required
               fullWidth
            />
         </div>

         <div className={activeTab === tabs.info2 ? "flex flex-col items-center gap-4 w-full" : "hidden"}>
            <Typography paragraph textAlign="center">
               <InfoOutlined fontSize="small" sx={{ mt: -0.5 }} /> Further details...
            </Typography>

            <TextField
               size="small"
               label="Description, 5-500 chars"
               name="description"
               placeholder="Give details about the property, services offered, rooms available etc"
               inputProps={{ minLength: 5, maxLength: 500 }}
               rows={10}
               multiline
               required
               fullWidth
            />
         </div>

         <div className="mt-auto w-full">
            {warningVisible && isLastTab && (
               <Typography
                  variant="body2"
                  color="tomato"
                  sx={{
                     display: "flex",
                     justifyContent: "space-around",
                     alignItems: "center",
                     borderBottom: "solid medium tomato",
                     backgroundColor: "rgba(255,0,0,0.1)",
                     py: 0.5,
                     px: 1,
                     mb: 3,
                     borderRadius: "5px 5px 0 0",
                  }}
               >
                  <WarningAmberRounded fontSize="large" color="inherit" sx={{ mr: 1 }} />
                  Please make sure you have entered all details appropriatley!
               </Typography>
            )}

            <div className="flex justify-between items-center">
               <Button
                  type="button"
                  disabled={activeTab === tabs.images}
                  variant="outlined"
                  color="secondary"
                  onClick={prevTab}
               >
                  Back
               </Button>
               {!isLastTab && (
                  <Button onClick={nextTab} type="button">
                     Next
                  </Button>
               )}
               {isLastTab && (
                  <Button onClick={showWarning} type="submit">
                     finish
                  </Button>
               )}
            </div>
         </div>
      </form>
   );
}
