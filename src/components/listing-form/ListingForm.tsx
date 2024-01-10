"use client";

import { ListingInterface } from "@/interfaces";
import {
   Box,
   Button,
   CircularProgress,
   Input,
   SxProps,
   TextField,
   Typography,
} from "@mui/material";
import { ArrowBack, CheckCircle, InfoOutlined, WarningAmber } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { capitalize } from "@/lib/utils";
import PreviewImages from "./PreviewImages";

const tabs = {
   images: "images",
   info: "info",
   furtherInfo: "further-info",
   submitting: "submitting",
   error: "error",
   success: "success",
};

export default function ListingForm({ listing }: { listing?: ListingInterface }) {
   const [data, setData] = useState({});
   const [activeTab, setActiveTab] = useState(tabs.images);
   const [errorMessage, setErrorMessage] = useState("");
   const router = useRouter();
   const formRef = useRef<HTMLFormElement>();

   function isFormComplete(): boolean {
      let isComplete = true;
      Object.keys(data).forEach((item) => {
         if (item === "images") {
            console.log("images ", data[item][0].size);
            console.log(Boolean(data[item][0].size));
            if (!data[item][0].size) isComplete = false;
         } else if (item !== "description") if (!data[item]) isComplete = false;
      });

      console.log(isComplete);
      return isComplete;
   }

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setActiveTab(tabs.submitting);
      const formData = new FormData(e.currentTarget);

      function submitListing(data: FormData, listingID?: number): any {
         const formDataObject: any = {};
         if (listingID) formDataObject["id"] = listingID;

         setTimeout(() => {
            for (const entry of data.entries()) {
               const [name, value] = entry;
               formDataObject[name] = value;
            }
         }, 3000);

         return { error: null, message: formDataObject };
         // return { error: "invalid inputs", message: formDataObject };
      }

      let res: any;
      if (listing) res = await submitListing(formData, listing.id as number);
      else res = await submitListing(formData);

      if (res.error) {
         setErrorMessage(res.error);
         setActiveTab(tabs.error);
      } else {
         console.log("new listing created", res.message);
         setActiveTab(tabs.success);
      }
   }

   function setCurrentFormData() {
      const formData = new FormData(formRef.current);

      function prepareData(data: FormData, listingID?: number): any {
         const formDataObject: any = {};
         if (listingID) formDataObject["id"] = listingID;
         for (const entry of data.entries()) {
            const [name, value] = entry;
            formDataObject[name] = value;
            formDataObject["images"] = data.getAll("images"); // since images cariies multiple values
         }

         return formDataObject;
      }

      let res: any;
      if (listing) res = prepareData(formData, listing.id as number);
      else res = prepareData(formData);
      setData(res);
   }

   function nextTab() {
      setCurrentFormData();
      switch (activeTab) {
         case tabs.images:
            setActiveTab(tabs.info);
            break;
         case tabs.info:
            setActiveTab(tabs.furtherInfo);
            break;
         default:
            throw new Error("Error setting next tab");
      }
   }

   function prevTab() {
      setCurrentFormData();
      switch (activeTab) {
         case tabs.info:
            setActiveTab(tabs.images);
            break;
         case tabs.furtherInfo:
            setActiveTab(tabs.info);
            break;
         default:
            throw new Error("Error setting prev tab");
      }
   }

   const showBackBtnTitleAndTabControls =
      (activeTab === tabs.images) | (activeTab === tabs.info) | (activeTab === tabs.furtherInfo);

   const boxStyles: SxProps = {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
   };

   return (
      <form
         ref={formRef}
         onSubmit={handleSubmit}
         className="flex flex-col items-center gap-4 w-full"
         style={{ minHeight: "80vh" }}
      >
         {showBackBtnTitleAndTabControls ? (
            <>
               <GoBackButton />
               <TabTitle activeTab={activeTab} listingTitle={listing?.title} />
            </>
         ) : (
            ""
         )}

         {/* {activeTab === tabs.images ? (
            <ImagesTab listing={listing} />
         ) : activeTab === tabs.info ? (
            <InfoTab listing={listing} />
         ) : activeTab === tabs.furtherInfo ? (
            <FurtherInfoTab listing={listing} />
         ) : activeTab === tabs.submitting ? (
            <SubmittingTab />
         ) : activeTab === tabs.error ? (
            <ErrorTab errorMessage={errorMessage} router={router} />
         ) : activeTab === tabs.success ? (
            <SuccessTab listing={listing} router={router} />
         ) : (
            ""
         )} */}
         <Box sx={{ display: activeTab === tabs.images ? "flex" : "none", ...boxStyles }}>
            <ImagesTab listing={listing} />
         </Box>
         <Box sx={{ display: activeTab === tabs.info ? "flex" : "none", ...boxStyles }}>
            <InfoTab listing={listing} />
         </Box>
         <Box sx={{ display: activeTab === tabs.furtherInfo ? "flex" : "none", ...boxStyles }}>
            <FurtherInfoTab listing={listing} />
         </Box>
         <Box sx={{ display: activeTab === tabs.submitting ? "flex" : "none", ...boxStyles }}>
            <SubmittingTab />
         </Box>
         <Box sx={{ display: activeTab === tabs.error ? "flex" : "none", ...boxStyles }}>
            <ErrorTab setActiveTab={setActiveTab} errorMessage={errorMessage} router={router} />
         </Box>
         <Box sx={{ display: activeTab === tabs.success ? "flex" : "none", ...boxStyles }}>
            <SuccessTab listing={listing} router={router} />
         </Box>

         {showBackBtnTitleAndTabControls ? (
            <TabControlButtons
               isFormComplete={isFormComplete}
               activeTab={activeTab}
               nextTab={nextTab}
               prevTab={prevTab}
            />
         ) : (
            ""
         )}
      </form>
   );
}

function GoBackButton() {
   const router = useRouter();
   const goBack = () => router.back();

   return (
      <div className="w-full">
         <Button type="button" variant="outlined" startIcon={<ArrowBack />} onClick={goBack}>
            Back
         </Button>
      </div>
   );
}

function TabTitle({
   activeTab,
   listingTitle,
}: {
   activeTab: string;
   listingTitle?: string | null;
}) {
   return (
      <>
         <Typography
            fontWeight="bold"
            sx={{
               maxWidth: "100%",
               textOverflow: "ellipsis",
               overflow: "hidden",
               whiteSpace: "nowrap",
            }}
         >
            {listingTitle ? `Editing - ${listingTitle}` : "New Listing"}
         </Typography>

         <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
               px: 1,
               py: 0.5,
               borderRadius: "5px",
               backgroundColor: "divider",
            }}
         >
            {capitalize(activeTab)}
         </Typography>
      </>
   );
}

function TabControlButtons({
   isFormComplete,
   activeTab,
   nextTab,
   prevTab,
}: {
   isFormComplete: () => boolean;
   activeTab: string;
   nextTab: () => void;
   prevTab: () => void;
}) {
   const isLastInputTab = activeTab === tabs.furtherInfo;
   const btnType = isLastInputTab ? "submit" : "button";
   return (
      <div className="flex justify-between items-center mt-auto w-full">
         <Button
            type="button"
            disabled={activeTab === tabs.images}
            variant="outlined"
            onClick={prevTab}
         >
            Back
         </Button>
         <Button
            key={"btn-" + new Date().getSeconds()}
            disabled={isLastInputTab ? !isFormComplete() : false}
            onClick={isLastInputTab ? undefined : nextTab}
            type={btnType}
         >
            {isLastInputTab ? "finish" : "Next"}
         </Button>
      </div>
   );
}

function ImagesTab({ listing }: { listing?: ListingInterface }) {
   const [images, setImages] = useState([]);
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setImages([...e.currentTarget.files]);
   }

   return (
      <>
         <Typography paragraph textAlign="center">
            <InfoOutlined fontSize="small" /> First, upload images! The first image will be used as
            the cover image.
         </Typography>

         <input
            type="file"
            name="images"
            onChange={handleChange}
            accept="image/*"
            multiple
            required
         />

         <Box
            sx={{
               height: "30vh",
               flexGrow: 1,
               overflowY: "auto",
               display: "grid",
               gridTemplateColumns: "1fr 1fr 1fr",
               backgroundColor: "divider",
               p: 0.5,
               borderRadius: "10px",
               width: "100%",
               position: "relative",
            }}
         >
            {images.length ? (
               <PreviewImages images={images} />
            ) : (
               <p className="col-span-3 flex items-center justify-center">Images preview</p>
            )}
         </Box>
      </>
   );
}

function InfoTab({ listing }: { listing?: ListingInterface }) {
   return (
      <>
         <Typography paragraph textAlign="center">
            <InfoOutlined fontSize="small" /> Provide the following details.
         </Typography>

         <TextField
            size="small"
            label="Title"
            name="title"
            defaultValue={listing?.title}
            placeholder="e.g Comfy apartment"
            // inputProps={{
            //    minLength: 5,
            //    maxLength: 30,
            // }}
            required
            fullWidth
         />

         <TextField
            size="small"
            label="Rent - USD/month"
            name="rent"
            type="number"
            defaultValue={listing?.rent}
            // inputProps={{
            //    min: 10,
            //    max: 10000,
            // }}
            required
            fullWidth
         />

         <TextField
            size="small"
            label="Location - City & Suburb"
            name="location"
            defaultValue={listing?.location}
            placeholder="e.g Harare, Belgravia"
            // inputProps={{
            //    minLength: 5,
            //    maxLength: 30,
            // }}
            required
            fullWidth
         />

         <TextField
            size="small"
            label="Nearest Institution"
            name="nearestTo"
            defaultValue={listing?.nearestTo}
            placeholder="e.g University of Zimbabwe"
            // inputProps={{
            //    minLength: 2,
            //    maxLength: 40,
            // }}
            required
            fullWidth
         />

         {/* <FormControl size="small" sx={{ mb: 3, width: "100%" }}>
            <InputLabel id="nearest-label">Nearest Institution</InputLabel>
            <Select
               labelId="nearest-label"
               id="nearest-select"
               label="Nearest Institution"
               name="nearest-institution"
               value={formState.nearestInstitution}
               onChange={(e) =>
                  dispatch({
                     type: "nearest-institution-changed",
                     options: { value: e.target.value },
                  })
               }
               fullWidth
            >
               <MenuItem value="uz">University of Zimbabwe</MenuItem>
               <MenuItem value="msu">Midlands State University</MenuItem>
               <MenuItem value="hit">Harare Institute Of Technology</MenuItem>
               <MenuItem value="htc">Harare Teachers College</MenuItem>
               <MenuItem value="htc">Other</MenuItem>
            </Select>
         </FormControl> */}

         <TextField
            size="small"
            label="Walking Distance - km"
            name="distance"
            type="number"
            defaultValue={listing?.distance}
            // inputProps={{
            //    minLength: 5,
            //    maxLength: 30,
            // }}
            required
            fullWidth
         />
      </>
   );
}

function FurtherInfoTab({ listing }: { listing?: ListingInterface }) {
   return (
      <>
         <Typography paragraph textAlign="center">
            <InfoOutlined fontSize="small" /> Further details...
         </Typography>

         <TextField
            size="small"
            label="Description"
            name="description"
            defaultValue={listing?.description}
            placeholder="Give details about the property, services offered, rooms available etc"
            // inputProps={{
            //    minLength: 5,
            //    maxLength: 300,
            // }}
            rows={10}
            multiline
            required
            fullWidth
         />
      </>
   );
}

function SuccessTab({ listing, router }: { listing?: ListingInterface; router: any }) {
   return (
      <div
         style={{ height: "80vh" }}
         className="w-full flex flex-col items-center justify-center gap-3"
      >
         <CheckCircle fontSize="large" color="primary" />
         <Typography paragraph textAlign="center">
            Done!
         </Typography>
         <Button
            type="button"
            onClick={() => {
               listing ? router.push("/accomodation/" + listing.slug) : router.back();
            }}
         >
            {listing ? "View" : "Back"}
         </Button>
      </div>
   );
}

function ErrorTab({
   setActiveTab,
   errorMessage,
   router,
}: {
   setActiveTab: (tab: string) => void;
   errorMessage: string;
   router: any;
}) {
   return (
      <div
         style={{ height: "80vh" }}
         className="w-full flex flex-col items-center justify-center gap-3"
      >
         <WarningAmber fontSize="large" color="error" />
         <Typography paragraph textAlign="center">
            An error occurred! <br />
            {errorMessage}
            <br />
            <Button onClick={() => setActiveTab(tabs.info)} sx={{ mt: 2, mr: 1 }}>
               Retry
            </Button>
            <Button variant="outlined" onClick={() => router.back()} sx={{ mt: 2 }}>
               Cancel
            </Button>
         </Typography>
      </div>
   );
}

function SubmittingTab() {
   return (
      <div
         style={{ height: "80vh" }}
         className="w-full flex flex-col items-center justify-center gap-3"
      >
         <CircularProgress />
         <Typography textAlign="center">Submitting...Please wait</Typography>
      </div>
   );
}
