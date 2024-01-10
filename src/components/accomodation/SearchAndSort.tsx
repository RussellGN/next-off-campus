"use client";

import { Tune, ArrowDownward, ArrowUpward, Close } from "@mui/icons-material";
import {
   Box,
   Button,
   FormControl,
   IconButton,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography,
} from "@mui/material";
import useSearchAndSort from "@/hooks/useSearchAndSort";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname, useRouter } from "next/navigation";

export default function SearchAndSort({
   openSidebar,
   incrementFiltersFormNumber,
}: {
   openSidebar: () => void;
   incrementFiltersFormNumber: () => void;
}) {
   const { handleQuery, handleSortChange, sortValue, queryValue } = useSearchAndSort();
   const isMobile = useIsMobile();
   const router = useRouter();
   const pathname = usePathname();

   function resetFiltersAndOtherSearchParams() {
      incrementFiltersFormNumber();
      router.replace(pathname);
   }

   return (
      <>
         <Box
            component="form"
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 1,
               mb: queryValue ? 2 : 4,
            }}
         >
            <Button type="button" onClick={openSidebar} sx={{ display: { md: "none" } }}>
               <Tune />
            </Button>

            <TextField
               // onKeyUp={(e: any) => {
               //    // type of any to shut the compiler up
               //    if (e.code === "Enter") {
               //       const q = e.target.value;
               //       e.target.value = "";
               //       handleQuery(q);
               //    }
               // }}
               onKeyUp={(e: any) => {
                  if (e.which === 13) {
                     const q = e.target.value;
                     e.target.value = "";
                     e.target.blur();
                     handleQuery(q);
                  }
               }}
               type="search"
               defaultValue={queryValue}
               size={isMobile ? "small" : "medium"}
               fullWidth
               variant="outlined"
               name="query"
               placeholder="Search..."
               sx={{
                  "& .MuiInputBase-root": {
                     backgroundColor: "background.paper",
                     borderRadius: "10px",
                  },
               }}
            />

            <FormControl size={isMobile ? "small" : "medium"}>
               <InputLabel id="sort-label">Sort</InputLabel>
               <Select
                  labelId="sort-label"
                  id="sort-select"
                  label="Sort"
                  name="sort"
                  value={sortValue || "popularity"}
                  onChange={handleSortChange}
                  autoWidth
                  sx={{
                     width: { sm: "fit-content" },
                     borderRadius: "10px",
                     backgroundColor: "background.paper",
                  }}
               >
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="date-des">
                     Date <ArrowDownward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
                  </MenuItem>
                  <MenuItem value="date-asc">
                     Date <ArrowUpward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
                  </MenuItem>
                  <MenuItem value="rent-ascending">
                     Rent
                     <ArrowUpward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
                  </MenuItem>
                  <MenuItem value="rent-descending">
                     Rent
                     <ArrowDownward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
                  </MenuItem>
               </Select>
            </FormControl>
         </Box>

         {queryValue && (
            <Typography noWrap variant="h6" sx={{ mb: 4, textAlign: "center" }}>
               <IconButton size="small" onClick={resetFiltersAndOtherSearchParams} sx={{ mr: 0.8 }}>
                  <Close />
               </IconButton>
               {`Results for "${queryValue}"`}
            </Typography>
         )}
      </>
   );
}
