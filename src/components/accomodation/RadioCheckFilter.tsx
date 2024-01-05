import { CheckboxOrRadioFilterInterface } from "@/interfaces";
import {
   Box,
   Checkbox,
   FormControl,
   FormControlLabel,
   FormGroup,
   Radio,
   RadioGroup,
   SxProps,
   Typography,
} from "@mui/material";

export default function RadioCheckFilter({ filter }: { filter: CheckboxOrRadioFilterInterface }) {
   const filterStyles: SxProps = {
      border: "solid thin",
      borderColor: "divider",
      borderRadius: "10px",
      p: 2,
      mb: 2,
   };

   if (filter.inputType === "checkbox")
      return (
         <Box sx={filterStyles}>
            <Typography>{filter.label}</Typography>

            <FormGroup>
               {filter.options.map((option) => {
                  return (
                     <FormControlLabel
                        key={option.value}
                        label={option.label}
                        control={
                           <Checkbox
                              size="small"
                              name={filter.name}
                              value={option.value}
                              defaultChecked={filter.default?.includes(option.value)}
                           />
                        }
                     />
                  );
               })}
            </FormGroup>
         </Box>
      );

   return (
      <Box sx={filterStyles}>
         <Typography>{filter.label}</Typography>

         <RadioGroup name={filter.name} defaultValue={filter.default}>
            {filter.options.map((option) => (
               <FormControlLabel
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  control={<Radio size="small" />}
               />
            ))}
         </RadioGroup>
      </Box>
   );
}
